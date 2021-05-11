const express = require('express')
const app = express()
const fetch = require('node-fetch');
app.use(express.json())
const port = 5000
const db = require('./model/Knex')

app.get('/', (req, res) => {  
fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
    .then(response => response.json())
    .then(json => json.forEach(data => {
       const {Name,Location,lat,lon} = data
       console.log({Name,Location,lat,lon})
      // db.add(data)
    }));
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
})

app.post('/home', (req,res) => {
  const {Name: park_name,Location: park_location,lat: park_latitude,lon:park_longitude} = req.body
  db.add({park_name,park_location, park_latitude,park_longitude})
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: err})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
