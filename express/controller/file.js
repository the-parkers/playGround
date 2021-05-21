const db = require('../model/Knex');
const jwt = require('jsonwebtoken');
const keys = require('../auth/auth')
const fetch = require('node-fetch');

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
// const getUserEvents = (req,res) => {
//   db.select('events')
//   .then(response => res.status(200).json(response))
// }


module.exports = {
    imageUpload,
    postFavorite,
    parkevents,
    // getUserEvents
}