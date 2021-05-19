const db = require('../model/Knex');
const jwt = require('jsonwebtoken');
const keys = require('../auth/auth');

const imageUpload = (req,res) => {
    if(req.files) {
        const {imageUpload} = req.files
        console.log(imageUpload.data)
    }
    res.sendStatus(200)
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