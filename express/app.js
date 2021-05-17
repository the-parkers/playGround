const express = require('express')
const app = express()
const fetch = require('node-fetch');
app.use(express.json())
const port = 5000
const db = require('./model/Knex')

app.get('/basketball', (req, res) => {  
fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
    .then(response => response.json())
    .then(json => json.forEach(data => {
       const {Name: name,Location: location,lat: latitude,lon: longitude} = data
      db.add({name,location,latitude,longitude},'basketball_courts')
    }));
    res.sendStatus(200)
})

app.get('/parks', (req, res) => {
  fetch('https://data.cityofnewyork.us/api/geospatial/k2ya-ucmv?method=export&format=GeoJSON')
      .then(response => response.json())
      .then(json => {
           json.features.forEach(data => {
             
            const {properties,geometry} = data
            const park_latitude = geometry.coordinates[0][0][0][1]
            const park_longitude = geometry.coordinates[0][0][0][0]
            const {zipcode:park_zipcode,location:park_location,url:park_link,name311: park_name,subcategor:subcategory,borough:park_borough} = properties
            const parkObj = {park_zipcode,park_location,park_link,park_name,subcategory,park_borough,park_latitude,park_longitude}
            db.add(parkObj,'parks')
     })
      }
    )
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
                  res.sendStatus(200)
              })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
