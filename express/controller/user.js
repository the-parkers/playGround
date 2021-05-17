const db = require('../model/Knex')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login =  (req,res) => {
    db.query('users',req.body.email)
    .then(async user => {
        const match = await bcrypt.compare(req.body.password, user[0].encrypted_password);
        if(match) {
            res.status(202).json(match)
        }else {
            res.status(404).json(match)
        }
    })
  }
const signUp = async (req,res) => {
    try {
        await bcrypt.hash(req.body.password, saltRounds).then(async hash => {
            const {email,firstName: first_name,lastName: last_name} = req.body
            db.add({email,first_name,last_name,encrypted_password: hash,user_image: null},'users')
            res.sendStatus(200)
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
  }
const basketball = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location,lat: latitude,lon: longitude} = data
          db.add({name,location,latitude,longitude},'basketball_courts')
        }));
        res.sendStatus(200)
    }
const parks = (req, res) => {
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
      }
const handball = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_Handball_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location,lat: latitude,lon: longitude, Num_of_Courts: court_count} = data
          db.add({name,location,latitude,longitude,court_count},'handball_courts')
        }));
        res.sendStatus(200)
    }
const indoor_pool = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_indoor_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_indoor_Type: pool_type, Size: pool_size} = data
          db.add({name,location,latitude,longitude,pool_type, pool_size},'indoor_pool')
        }));
        res.sendStatus(200)
    }
const outdoor_pool = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_outdoor_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_outdoor_Type: pool_type, Size: pool_size} = data
          db.add({name,location,latitude,longitude,pool_type, pool_size},'outdoor_pool')
        }));
        res.sendStatus(200)
    }
const running_track = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_RunningTracks_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location,lat: latitude,lon: longitude, Size: size, RunningTracks_Type: track_type} = data
          db.add({name,location,latitude,longitude,size,track_type},'running_track')
        }));
        res.sendStatus(200)
    }
const bbqing_areas = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_Barbecue_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Location: location} = data
          db.add({name,location},'bbqing_areas')
        }));
        res.sendStatus(200)
    }
const dog_areas = (req, res) => {  
    fetch('https://www.nycgovparks.org/bigapps/DPR_DogRuns_001.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {Name: name,Address: address,DogRuns_Type: dogruns_type} = data
          db.add({name,address,dogruns_type},'dog_areas')
        }));
        res.sendStatus(200)
    }
const park_events = (req, res) => {  
    fetch('https://www.nycgovparks.org/xml/events_300_rss.json')
        .then(response => response.json())
        .then(json => json.forEach(data => {
           const {title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image} = data
          db.add({title,description,parknames,startdate,enddate,starttime,endtime,location,coordinates,image},'park_events')
        }));
        res.sendStatus(200)
    }
const fillDb = (req, res) => { 
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
  }

  module.exports = {
     login,
     signUp,
     basketball,
     parks,
     handball,
     indoor_pool,
     outdoor_pool,
     running_track,
     bbqing_areas,
     dog_areas,
     park_events,
     fillDb
}