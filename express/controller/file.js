const db = require('../model/Knex');
const jwt = require('jsonwebtoken');
const keys = require('../auth/auth')
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const imageUpload = (req,res) => {
    if(req.files) {
        const {imageUpload} = req.files
        const user = JSON.parse(req.headers.user)
        const {Token,User} = user
        jwt.verify(Token, keys.key, function(err, decoded) {
          if(decoded) {
            db.query('users','id',decoded.id)
            .then(response => {
              if(response[0].email === User) {
                delete response[0].encrypted_password
                db.update('users',response[0].id,{user_image: imageUpload.data})
                .then(response => {
                    res.status(200).json({Auth: true,image: response[0].user_image})
                })
              }
            })
          }else {
            res.status(200).json({Auth: false})
          }
        });
    }
  }
const parkevents = async (req,res) => {
  await fetch('https://www.nycgovparks.org/xml/events_300_rss.json')
  .then(response => response.json())
  .then(json => {
      json = json.map(result => {
        let {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image} = result
        coordinates = coordinates.split(' ')
        const latitude = Number(coordinates[0].slice(0, -1)).toFixed(3);
        let longitude = Number(coordinates[1]).toFixed(3)
        if(longitude === 'NaN') {
          longitude = Number(coordinates[1].slice(0, -1)).toFixed(3);
        }
        result = {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,latitude,longitude,image}
        return result
      })
      db.select('parks')
      .then(response => {
        response.forEach(data => {     
            data.park_latitude = Number(data.park_latitude).toFixed(3)
            data.park_longitude = Number(data.park_longitude).toFixed(3)
              const obj = json.filter(item => item.latitude == data.park_latitude && item.longitude == data.park_longitude)
              if(obj.length) {
                obj.forEach(item => {
                  item.park_name = data.park_name
                  
                  db.add(item,'park_events')
                })
              }
        })
      })
  })
  res.sendStatus(201)
}
const postFavorite = (req,res) => {
    console.log(req.body)
    
    if(!req.body)res.sendStatus(404);
    jwt.verify(req.body.user_id, keys.key, function(err, decoded) {
        if(decoded) {
            req.body.user_id = decoded.id
            db.add(req.body,'favorites')
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })
}

const favorites = (req,res) => {
    jwt.verify(req.body.Token, keys.key, function(err, decoded) {
        if(decoded) {
               db.join(decoded.id)
                .then(resData => { 
                    res.status(200).json(resData)
                   })
    }
})
}
// res.status(200).json({response, user: decoded.id}
// const favorites = (req, res) => {  
    // console.log(req)
    // db.query('favorites','email',req.body.email)
    // .then(async user => {
    //     const match = await bcrypt.compare(req.body.password, user[0].encrypted_password);
    //     if(match) {
    //         const id = user[0].id
    //         const token = jwt.sign({id}, keys.key);
    //         res.status(202).json({Auth:match,Token: token})
    //     }else {
    //         res.status(404).json(match)
    //     }
    // })
    // }
const updateProfile = (req,res) => {
  const {firstName:first_name,lastName:last_name,email,password,user} = req.body
  db.query('users','email',user)
            .then(async response => {
              const match = await bcrypt.compare(password, response[0].encrypted_password);
              if(match) {
                db.query('users','email',email)
                .then(result => {
                   if(!result.length) {
                     db.updateTo({first_name,last_name,email},'users','id',response[0].id)
                     .then(nxtData => {
                       delete nxtData[0].encrypted_password
                       delete nxtData[0].id
                       delete nxtData[0].user_image
                      res.status(200).json({Auth:match,User:nxtData[0]})
                     })
                  }else {
                    console.log('email exist',result) 
                    res.status(200).json({Auth:match,Duplicate:true,message: 'make it wrk'})
                  }
                })
              }else {
                res.status(200).json({Auth:match,message: 'Wrong Password'})
              }
            })
}
module.exports = {
    imageUpload,
    postFavorite,
    parkevents,
    updateProfile,
    favorites
}