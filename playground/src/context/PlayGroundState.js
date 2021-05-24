import { useEffect, useState} from "react"
import PlayGroundContext from "./PlayGroundContext"

function PlayGround(props) {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  let [playgrounds, setPlaygrounds] = useState([])
  const [parkSearch, setParkSearch] = useState("")
  const [top100Parks,setTop100Parks] = useState([])
  const [position,setPosition] = useState({})
  const [favorite, setFavorites] = useState([])
  const [bBallCourt, setBasketBalls] = useState([])
  const [bbqArea, setBbqAreas] = useState([])
  const [dogAreas, setdogAreas] = useState([])
  const [runTracks, setRunTracks] = useState([])
  const [handBallCourt, setHandBallCourt] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/getBballCourt')
    .then(response => response.json())
    .then(data => setBasketBalls(data))
  },[])
  useEffect(() => {
    fetch('http://localhost:5000/getBbq')
    .then(response => response.json())
    .then(data => setBbqAreas(data))
  },[])
  useEffect(() => {
    fetch('http://localhost:5000/getDogAreas')
    .then(response => response.json())
    .then(data => setdogAreas(data))
  },[])
  useEffect(() => {
    fetch('http://localhost:5000/getRunTracks')
    .then(response => response.json())
    .then(data => setRunTracks(data))
  },[])
  useEffect(() => {
    fetch('http://localhost:5000/getHandBall')
    .then(response => response.json())
    .then(data => setHandBallCourt(data))
  },[])

  useEffect(() => {
    fetch('http://localhost:5000/favoritesList')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setFavorites(data)})
  }, [])

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
    playgrounds = playgrounds.filter(park => park.park_name !== "Park")
    if(position.lat && position.lon && playgrounds.length > 1 && top100Parks.length === 0) {
      playgrounds.forEach(parks => {
        if(parks){
          const length = distance(position.lat,position.lon,Number(parks.park_latitude),Number(parks.park_longitude))
          parks.distance = length
        }
      })
      playgrounds.sort((a,b) => a.distance-b.distance)
      setTop100Parks(playgrounds)

    }
   const filteredParks = top100Parks.filter(park => park.park_location !== null && park.park_name !== null && park.park_name.toLowerCase().includes(parkSearch.toLowerCase()))
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
    top100Parks,
    favorite,
    setFavorites,
    bBallCourt,
    bbqArea,
    dogAreas,
    runTracks,
    handBallCourt
   }
    return(
        <PlayGroundContext.Provider value={value}>
          {props.children}
        </PlayGroundContext.Provider>
      )
}

export default PlayGround