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
    // console.log(req.body)
    
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

module.exports = {
    imageUpload,
    postFavorite,
    favorites
}