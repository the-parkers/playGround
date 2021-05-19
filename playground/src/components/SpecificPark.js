import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'
import Ratingmodal from './Ratingmodal'
import CommunityEventModal from './CommunityEventModal'
function SpecificPark(){
    let { parkId } = useParams()
    let { playgrounds } = useContext(PlayGroundContext)
   if(playgrounds.length) {
    const [rating, setRating] = useState([])
    const currentPark = playgrounds.find(park => park.id === Number(parkId))
    const latitude = currentPark.park_latitude
    const longitude = currentPark.park_longitude
    const myStyle={width:"600px", height:"450px", style:"border:0", allowfullscreen:"", loading:"lazy"}
    useEffect(() => {
        fetch('http://localhost:5000/getEvents')
            .then(res => res.json())
            .then(data => console.log(data))
    },[])
    useEffect(() => {
        fetch('http://localhost:5000/getRatings')
        .then(res => res.json())
        .then(data => setRating(data))
    }, [])
    const currentParkRating = rating.filter(parks => parks.park_id === currentPark.id)
    console.log(currentParkRating)
    const cleanRate = []
    const locaRate = []
    const amenRate = []
    currentParkRating.forEach(rating => {
        cleanRate.push(rating.cleanliness_rating)
        locaRate.push(rating.location_rating)
        amenRate.push(rating.amenities_rating)
    })
    let overAllClean = 5
    let overAllLoca = 5
    let overAllAmen = 5
    if(cleanRate.length !== 0){
    overAllClean = Math.floor((cleanRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllLoca = Math.floor((locaRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllAmen = Math.floor((amenRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)        
    }

    return (
        <div>
            <h1>{currentPark.park_name}</h1>
            <iframe title={"map"} src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`} style={myStyle}></iframe>
                <Ratingmodal currentPark={currentPark}/>
                <CommunityEventModal currentPark={currentPark}/>
                <h3>Cleanliness: {overAllClean}</h3>
                <h3>Location: {overAllLoca}</h3>
                <h3>Amenities: {overAllAmen}</h3>
        </div>
    )
    }else {
        return null
    }
}

export default SpecificPark