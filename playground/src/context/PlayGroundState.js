import { useEffect, useState} from "react"
import PlayGroundContext from "./PlayGroundContext"

function PlayGround(props) {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [playgrounds, setPlaygrounds] = useState([])
    const [parkSearch, setParkSearch] = useState("")
    const [top100Parks,setTop100Parks] = useState([])
    const [position,setPosition] = useState({})
    

    // useEffect(() => {
    //     fetch('http://localhost:5000')
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // },[])

    // useEffect(() => {
    //   fetch('https://data.cityofnewyork.us/api/geospatial/k2ya-ucmv?method=export&format=GeoJSON')
    //     .then(res => res.json())
    //     .then(data => setPlaygrounds(data.features))
    // }, [])
      //   useEffect(() => {
      //   fetch('http://localhost:5000/favoritesList')
      //     .then(res => res.json())
      //     .then(data => {
      //       console.log(data)
      //       setFavorites(data)})
      // }, [])

       useEffect(() => {
      fetch('http://localhost:5000/parksData')
        .then(res => res.json())
        .then(data => setPlaygrounds(data))
    }, [])

    function distance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
              c(lat1 * p) * c(lat2 * p) * 
              (1 - c((lon2 - lon1) * p))/2;
    
      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }

    if(position.lat && position.lon && playgrounds.length > 1 && top100Parks.length === 0) {
      playgrounds.forEach(parks => {
        if(parks){
          const length = distance(position.lat,position.lon,Number(parks.park_latitude),Number(parks.park_longitude))
          parks.distance = length
        }
      })
      playgrounds.sort((a,b) => a.distance-b.distance)
      setTop100Parks(playgrounds)
      // setPlaygrounds(playgrounds)
    }
  
   const filteredParks = top100Parks.filter(park => park.park_location !== null && park.park_name !== null && park.park_name.toLowerCase().includes(parkSearch.toLowerCase()))
// console.log(filteredParks)
   const value = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    playgrounds, 
    parkSearch,
    setParkSearch,
    filteredParks,
    position,
    setPosition,
    top100Parks
   }
    return(
        <PlayGroundContext.Provider value={value}>
          {props.children}
        </PlayGroundContext.Provider>
      )
}

export default PlayGround