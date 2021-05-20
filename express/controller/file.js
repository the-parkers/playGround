const db = require('../model/Knex');
const jwt = require('jsonwebtoken');
const keys = require('../auth/auth');

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

module.exports = {
    imageUpload,
    postFavorite
}