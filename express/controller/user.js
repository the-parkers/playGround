const db = require('../model/Knex')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const keys = require('../auth/auth')
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');



const login =  (req,res) => {
    db.query('users','email',req.body.email)
    .then(async user => {
        const match = await bcrypt.compare(req.body.password, user[0].encrypted_password);
        if(match) {
            const id = user[0].id
            const token = jwt.sign({id}, keys.key);
            res.status(202).json({Auth:match,Token: token,User: user[0].email})
        }else {
            res.status(404).json(match)
        }
    })
  }
const signUp = async (req,res) => {
    try {
        await bcrypt.hash(req.body.password, saltRounds).then(async hash => {
            const {email,firstName: first_name,lastName: last_name} = req.body
            db.query('users','email',req.body.email)
            .then(response => {
              if(!response.length) {
                  db.add({email,first_name,last_name,encrypted_password: hash,user_image: null},'users')
                    .then(user => {
                      const id = user[0].id
                    const token = jwt.sign({id}, keys.key);
                    res.status(200).json({Token: token,User: user[0].email})
                    })
              }else {
                res.status(200).json({Message: 'Duplicate Email'})
              }
            })
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
const parksData = (req,res) => {
    db.select('parks',req.body.email)
    .then(response => res.status(200).json(response))
}
const fixthem = async (req,res) => {
  await fetch('https://www.nycgovparks.org/bigapps/DPR_Basketball_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Location: location,lat: latitude,lon: longitude} = result
      result = {name, location,latitude, longitude}
      result.latitude=Number(result.latitude).toFixed(3)
      result.longitude=Number(result.longitude).toFixed(3)
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
                delete item.id
                db.add(item,'basketball_courts_name')
              })
            }
      })
    })
  })
  await fetch('https://www.nycgovparks.org/bigapps/DPR_DogRuns_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Address: address,DogRuns_Type: dogruns_type} = result
      result = {name,address,dogruns_type}
      return result
    })
    db.select('parks')
    .then(response => {
      response.forEach(result => {
        if(result.park_name !== 'Park') {
          const obj = json.filter(item => item.name.includes(result.park_name))
          if(obj.length) {
            obj.forEach(items => {
              items.park_name = result.park_name
              delete items.id
              db.add(items,'dog_areas_name')
            })
          }
        }
      })
    })
  })
 await fetch('https://www.nycgovparks.org/bigapps/DPR_Barbecue_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Location: location} = result
      result = {name,location}
      return result
    })
    db.select('parks')
    .then(response => {
      response.forEach(result => {
        if(result.park_name !== 'Park') {
          const obj = json.filter(item => item.name.includes(result.park_name))
          if(obj.length) {
            obj.forEach(items => {
              items.park_name = result.park_name
              delete items.id
              db.add(items,'bbqing_areas_name')
            })
          }
        }
      })

    })
  })
  await fetch('https://www.nycgovparks.org/bigapps/DPR_Handball_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Location: location,lat: latitude,lon: longitude, Num_of_Courts: court_count} = result
      result = {name,location,latitude,longitude,court_count}
      return result
    })
    db.select('parks')
    .then(response => {
      response.forEach(result => {
        if(result.park_name !== 'Park') {
          const obj = json.filter(item => item.name.includes(result.park_name))
          if(obj.length) {
            obj.forEach(items => {
              items.park_name = result.park_name
              delete items.id
              db.add(items,'handball_courts_name')
            })
          }
        }
      })

    })
  })
  await fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_indoor_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_indoor_Type: pool_type, Size: pool_size} = result
      result = {name,location,latitude,longitude,pool_type, pool_size}
      result.latitude=Number(result.latitude).toFixed(3)
      result.longitude=Number(result.longitude).toFixed(3)
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
                delete item.id
                db.add(item,'indoor_pool_name')
              })
            }
      })
    })
  })
  await fetch('https://www.nycgovparks.org/bigapps/DPR_Pools_outdoor_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Location: location,lat: latitude,lon: longitude, Pools_outdoor_Type: pool_type, Size: pool_size} = result
      result = {name,location,latitude,longitude,pool_type, pool_size}
      result.latitude=Number(result.latitude).toFixed(3)
      result.longitude=Number(result.longitude).toFixed(3)
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
                delete item.id
                db.add(item,'outdoor_pool_name')
              })
            }
      })
    })
  })
  await fetch('https://www.nycgovparks.org/bigapps/DPR_RunningTracks_001.json')
  .then(response => response.json())
  .then(json => {
    json = json.map(result => {
      const {Name: name,Location: location,lat: latitude,lon: longitude, Size: size, RunningTracks_Type: track_type} = result
      result = {name,location,latitude,longitude,size,track_type}
      return result
    })
    db.select('parks')
    .then(response => {
      response.forEach(result => {
        if(result.park_name !== 'Park') {
          const obj = json.filter(item => item.name.includes(result.park_name))
          if(obj.length) {
            obj.forEach(items => {
              items.park_name = result.park_name
              delete items.id
              db.add(items,'running_track_name')
            })
          }
        }
      })

    })
  })
  res.sendStatus(200)
}
const verifySession = (req,res) => {
  const {Token,User} = req.body
  jwt.verify(Token, keys.key, function(err, decoded) {
    if(decoded) {
      db.query('users','id',decoded.id)
      .then(response => {
        if(response[0].email === User) {
          res.status(200).json({Auth: true})
        }
      })
    }else {
      res.status(200).json({Auth: false})
    } // bar
  });
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
     fillDb,
     parksData,
     fixthem,
     verifySession
}