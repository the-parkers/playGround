import { useContext, useEffect } from 'react'
import Parkcard from './ParkCard'
import PlayGroundContext from '../context/PlayGroundContext'
import { useHistory } from 'react-router'
import { Card, Dropdown } from 'semantic-ui-react'

function HomePage(){
  const context = useContext(PlayGroundContext)
  const {userFavorites} = context

  let history = useHistory()
  let {filteredParks, parkSearch,position, setParkSearch,setPosition,setFilteredParks,originalPark} = useContext(PlayGroundContext)
  filteredParks.length = 20
  // console.log(filteredParks)
  navigator.geolocation.getCurrentPosition((position) => {
    if(position.coords.latitude && position.coords.longitude){
      if(!position.lat) {
      setPosition((prev) => ({...prev,lat:position.coords.latitude,lon:position.coords.longitude}))
      }
    }
  },()=>{
    if(!position.lat) {
      setPosition((prev) => ({...prev,lat:40.8002663,lon:-73.9577346}))
    }
  })
  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user) {
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: user
    }
    fetch('http://localhost:5000/verifySession',options)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      if(!data.Auth) {
        history.push('/')
      }
    })
    }else {
      history.push('/')
    }
  },[history])



  const options = [
    { key: 1, text: 'BasketBall', value: 1 },
    { key: 2, text: 'BBQ', value: 2 },
    { key: 3, text: 'Dog Area', value: 3 },
    { key: 4, text: 'Track', value: 4},
    { key: 5, text: 'HandBall Court', value: 5 },
    { key: 6, text: 'Indoor Pool', value: 6 },
    { key: 7, text: 'Outdoor Pool', value: 7 }
  ]
  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  const filter = (event,semantic) => {
    console.log(event)
    if(semantic.value === 1) {
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'basketball_courts_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else if(semantic.value === 2) {
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'bbqing_areas_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else if(semantic.value === 3) { 
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'dog_areas_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.location = data.address;
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else if(semantic.value === 4) {
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'running_track_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.location = data.address;
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else if(semantic.value === 5) {
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'handball_courts_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.location = data.address;
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else if(semantic.value === 6) {
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'indoor_pool_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.location = data.address;
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else if(semantic.value === 7) {
      const options = {
        method: 'get',
        headers: {'Content-Type': 'application/json',
      'filter': 'outdoor_pool_name'}
      }
      fetch('http://localhost:5000/filter',options)
      .then(response => response.json())
      .then(data => {
        data.length = 50
        data.map(data => {
          data.location = data.address;
          data.distance = distance(Number(data.park_latitude),Number(data.park_longitude),position.lat,position.lon)
          return data
        })
        setFilteredParks(data.sort((a,b) => a.distance - b.distance))
      })
    }else {
      setFilteredParks(originalPark)
    }
  }
  return (
    <>
    <iframe title="unique" src="https://www.google.com/maps/d/u/0/embed?mid=1dsENHUDTkxHavdRkj32MzivBxLYl9fI3&z=13" width="800" height="480"></iframe>
    <h1>Local Playgrounds</h1>
    <div>
        <input value={parkSearch} onChange={(e)=> {setParkSearch(e.target.value)}}></input>
        <Dropdown clearable options={options} selection onChange={filter}/>
    </div>
      <br/>
      <div className="all_parks">
      <Card.Group centered>
        {filteredParks.map((park, i) => {
          return (
            <Parkcard key={i} Park={park} search={setParkSearch} userFavs={userFavorites}/>
          )
        })}
        </Card.Group>
      </div>  
    </>
  )
}

export default HomePage