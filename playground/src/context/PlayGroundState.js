import { useEffect, useState} from "react"
import PlayGroundContext from "./PlayGroundContext"

function PlayGround(props) {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [playgrounds, setPlaygrounds] = useState([])
    const [parkSearch, setParkSearch] = useState("")
    // useEffect(() => {
    //     fetch('http://localhost:5000')
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // },[])

    useEffect(() => {
      fetch('https://data.cityofnewyork.us/api/geospatial/k2ya-ucmv?method=export&format=GeoJSON')
        .then(res => res.json())
        .then(data => setPlaygrounds(data.features))
    }, [])

    let filteredParks = []
    filteredParks = playgrounds.filter(park => park.properties.address !== null && park.properties.name311 !== null && park.properties.name311.toLowerCase().includes(parkSearch.toLowerCase()))

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
    filteredParks
   }
    return(
        <PlayGroundContext.Provider value={value}>
          {props.children}
        </PlayGroundContext.Provider>
      )
}

export default PlayGround