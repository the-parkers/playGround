import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'
import Ratingmodal from './Ratingmodal'
import CommunityEventModal from './CommunityEventModal'
import EventCard from './EventCard'
import { Rating } from 'semantic-ui-react'

function SpecificPark(){
    let { parkId } = useParams()
    let { playgrounds,bBallCourt,bbqArea,dogAreas,runTracks,handBallCourt } = useContext(PlayGroundContext)
    const [parkEvents, setParkEvents] = useState([])
    
    const [rating, setRating] = useState([])
    const currentPark = playgrounds.find(park => park.id === Number(parkId))
    const context = useContext(PlayGroundContext)
    const {events} = context

    
    useEffect(() => {
        fetch('http://localhost:5000/getUserEvents')
            .then(res => res.json())
            .then(data => console.log(data))
    },[])
    useEffect(() => {
        fetch('http://localhost:5000/getEvents')
            .then(res => res.json())
            .then(data => setParkEvents(data))
    },[])
    useEffect(() => {
        fetch('http://localhost:5000/getRatings')
        .then(res => res.json())
        .then(data => setRating(data))
    }, [])
    
    if(playgrounds.length && rating.length) {
            const latitude = currentPark.park_latitude
            const longitude = currentPark.park_longitude
            const myStyle={width:"600px", height:"450px", style:"border:0", allowfullscreen:"", loading:"lazy"}
            const currentParkRating = rating.filter(parks => parks.park_id === currentPark.id)
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
            const cardHolder = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
            const allEvents = events.concat(parkEvents)
            const filteredEvents = allEvents.filter( event => event.park_id === currentPark.id)
            const bBallCheck = bBallCourt.filter(park => park.name === currentPark.park_name).length === 0 ? "X" : "✓"
            const bbqAreaCheck = bbqArea.filter(park => park.name === currentPark.park_name).length === 0 ? "X" : "✓"
            const dogAreaCheck = dogAreas.filter(park => park.name.includes(currentPark.park_name)).length === 0 ? "X" : "✓"
            const runTrackCheck = runTracks.filter(park => park.name.includes(currentPark.park_name)).length === 0 ? "X" : "✓"
            const handBallCheck = handBallCourt.filter(park => park.name.includes(currentPark.park_name)).length === 0 ? "X" : "✓"
            return (
                <div>
                    <h1>{currentPark.park_name}</h1>
                    <iframe title={"map"} src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`} style={myStyle}></iframe>
                        <Ratingmodal currentPark={currentPark}/>
                        <CommunityEventModal currentPark={currentPark} />
                        <h3>Cleanliness: <Rating icon='star' size='large' defaultRating={overAllClean} maxRating={5} disabled /></h3>
                        <h3>Location: <Rating  icon='star' size='large' defaultRating={overAllLoca} maxRating={5} disabled /></h3>
                        <h3>Amenities: <Rating icon='star' size='large' defaultRating={overAllAmen} maxRating={5} disabled /></h3>
                        <h4>Basketball Courts: {bBallCheck}</h4>
                        <h4>Bbq Area: {bbqAreaCheck}</h4>
                        <h4>Dog Area: {dogAreaCheck}</h4>
                        <h4>Running Track: {runTrackCheck}</h4>
                        <h4>HandBall Courts: {handBallCheck}</h4>
                        <div style={cardHolder}>
                        {filteredEvents.map((event, i) => {
                            return (
                               <EventCard key={i} event={event}/> 
                            )
                        })}
                        </div>
                </div>
            )
    }else {
        return null
    }
}

export default SpecificPark