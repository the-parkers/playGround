const express = require('express')
const app = express()
const fetch = require('node-fetch');
app.use(express.json())
const port = 5000
const db = require('./model/Knex');

app.get('/users', (req, res) => {  
  console.log(req)
  db.add({email,encrypted_password},'users')
  res.sendStatus(200)
})

app.get('/basketball', (req, res) => {  
fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
    .then(response => response.json())
    .then(json => json.forEach(data => {
       const {Name: name,Location: location,lat: latitude,lon: longitude} = data
      db.add({name,location,latitude,longitude},'basketball_courts')
    }));
    res.sendStatus(200)
})

app.get('/handball', (req, res) => {  
  fetch('https://www.nycgovparks.org/bigapps/DPR_Handball_001.json')
      .then(response => response.json())
      .then(json => json.forEach(data => {
         const {Name: name,Location: location,lat: latitude,lon: longitude, Num_of_Courts: court_count} = data
        db.add({name,location,latitude,longitude,court_count},'handball_courts')
      }));
      res.sendStatus(200)
  })

  app.get('/indoor_pool', (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_indoor_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_indoor_Type: pool_type, Size: pool_size} = data
          db.add({name,location,latitude,longitude,pool_type, pool_size},'indoor_pool')
        }));
        res.sendStatus(200)
    })

    app.get('/outdoor_pool', (req, res) => {  
      fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_outdoor_001.json')
          .then(response => response.json())
          .then(json => json.forEach(data => {
             const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_outdoor_Type: pool_type, Size: pool_size} = data
            db.add({name,location,latitude,longitude,pool_type, pool_size},'outdoor_pool')
          }));
          res.sendStatus(200)
      })

      app.get('/running_track', (req, res) => {  
        fetch('https://www.nycgovparks.org/bigapps/DPR_RunningTracks_001.json')
            .then(response => response.json())
            .then(json => json.forEach(data => {
               const {Name: name,Location: location,lat: latitude,lon: longitude, Size: size, RunningTracks_Type: track_type} = data
              db.add({name,location,latitude,longitude,size,track_type},'running_track')
            }));
            res.sendStatus(200)
        })
        app.get('/bbqing_areas', (req, res) => {  
          fetch('https://www.nycgovparks.org/bigapps/DPR_Barbecue_001.json')
              .then(response => response.json())
              .then(json => json.forEach(data => {
                 const {Name: name,Location: location} = data
                db.add({name,location},'bbqing_areas')
              }));
              res.sendStatus(200)
          })

          app.get('/dog_areas', (req, res) => {  
            fetch('https://www.nycgovparks.org/bigapps/DPR_DogRuns_001.json')
                .then(response => response.json())
                .then(json => json.forEach(data => {
                   const {Name: name,Address: address,DogRuns_Type: dogruns_type} = data
                  db.add({name,address,dogruns_type},'dog_areas')
                }));
                res.sendStatus(200)
            })

            app.get('/park_events', (req, res) => {  
              fetch('https://www.nycgovparks.org/xml/events_300_rss.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                     const {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image} = data
                    db.add({title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image},'park_events')
                  }));
                  res.sendStatus(200)
              })
              app.get('/', (req, res) => { 
                fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                    const {Name: name,Location: location,lat: latitude,lon: longitude} = data
                    db.add({name,location,latitude,longitude},'basketball_courts')
                  }));
                  fetch('https://www.nycgovparks.org/bigapps/DPR_Handball_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                    const {Name: name,Location: location,lat: latitude,lon: longitude, Num_of_Courts: court_count} = data
                    db.add({name,location,latitude,longitude,court_count},'handball_courts')
                  }));
                  fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_indoor_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                    const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_indoor_Type: pool_type, Size: pool_size} = data
                    db.add({name,location,latitude,longitude,pool_type, pool_size},'indoor_pool')
                  }));
                  fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_outdoor_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                     const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_outdoor_Type: pool_type, Size: pool_size} = data
                    db.add({name,location,latitude,longitude,pool_type, pool_size},'outdoor_pool')
                  }));
                  fetch('https://www.nycgovparks.org/bigapps/DPR_RunningTracks_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                     const {Name: name,Location: location,lat: latitude,lon: longitude, Size: size, RunningTracks_Type: track_type} = data
                    db.add({name,location,latitude,longitude,size,track_type},'running_track')
                  }));
                  fetch('https://www.nycgovparks.org/bigapps/DPR_Barbecue_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                     const {Name: name,Location: location} = data
                    db.add({name,location},'bbqing_areas')
                  }));
                  fetch('https://www.nycgovparks.org/bigapps/DPR_DogRuns_001.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                     const {Name: name,Address: address,DogRuns_Type: dogruns_type} = data
                    db.add({name,address,dogruns_type},'dog_areas')
                  }));
                  fetch('https://www.nycgovparks.org/xml/events_300_rss.json')
                  .then(response => response.json())
                  .then(json => json.forEach(data => {
                     const {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image} = data
                    db.add({title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image},'park_events')
                  }));
              })


// app.post('/home', (req,res) => {
//   const {Name: park_name,Location: park_location,lat: park_latitude,lon:park_longitude} = req.body
//   db.add({park_name,park_location, park_latitude,park_longitude})
//   .then(response => {
//     res.status(200).json(response)
//   })
//   .catch(err => {
//     console.log(err)
//     res.status(500).json({message: err})
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
