import { useContext, useEffect } from 'react'
import Parkcard from './ParkCard'
import PlayGroundContext from '../context/PlayGroundContext'
import { useHistory } from 'react-router'
// import { Dropdown } from 'semantic-ui-react'

function HomePage(){
  let history = useHistory()
  let {filteredParks, parkSearch,position, setParkSearch,setPosition} = useContext(PlayGroundContext)
  filteredParks.length = 30
  console.log(filteredParks)
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
      console.log(data)
      if(!data.Auth) {
        history.push('/')
      }
    })
    }else {
      history.push('/')
    }
  },[history])



  // const options = [
  //   { key: 1, text: 'Choice 1', value: 1 },
  //   { key: 2, text: 'Choice 2', value: 2 },
  //   { key: 3, text: 'Choice 3', value: 3 },
  // ]
  // const filter = (event,semantic) => {
  //   console.log(semantic.value)
  // }
  return (
    <>
    <iframe title="unique" src="https://www.google.com/maps/d/u/0/embed?mid=1dsENHUDTkxHavdRkj32MzivBxLYl9fI3&z=13" width="800" height="480"></iframe>
    <h1>Local Playgrounds</h1>
    <div>
        <input value={parkSearch} onChange={(e)=> {setParkSearch(e.target.value)}}></input>
        {/* <Dropdown clearable options={options} selection onChange={filter}/> */}
    </div>
      
      <div className="all_parks">
        {filteredParks.map((park, i) => {
          return (
            <Parkcard key={i} Park={park} search={setParkSearch}/>
          )
        })}
      </div>  
    </>
  )
}

export default HomePage