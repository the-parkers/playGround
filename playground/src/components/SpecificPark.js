import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'
import Ratingmodal from './Ratingmodal'
import {Tabs, Tab} from 'react-bootstrap'
import CommunityEventModal from './CommunityEventModal'
import EventCard from './EventCard'
import LargeEventsCard from './LargeEventsCard'
import { Rating } from 'semantic-ui-react'
import {useHistory} from 'react-router';
import SpecificMap from './SpecificMap'
import { Icon } from "leaflet";

function SpecificPark(){
    let { parkId } = useParams()
    let { playgrounds,bBallCourt,bbqArea,dogAreas,runTracks,handBallCourt,parkEvents, setParkEvents } = useContext(PlayGroundContext)
    const [rating, setRating] = useState([])
    const currentPark = playgrounds.find(park => park.id === Number(parkId))
    const context = useContext(PlayGroundContext)
    const {events} = context
    let history = useHistory()
  
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
          if(!data.Auth) {
            history.push('/')
          }
        })
        }else {
          history.push('/')
        }
      },[history])
        const parkIcons =  new Icon({
          iconUrl: 'https://cdn1.iconfinder.com/data/icons/map-objects/154/map-object-tree-park-forest-point-place-512.png',
          iconSize: [40,40],
        })
    useEffect(() => {
        fetch('http://localhost:5000/getEvents')
            .then(res => res.json())
            .then(data => setParkEvents(data))
    },[setParkEvents])

    useEffect(() => {
        fetch('http://localhost:5000/getRatings')
        .then(res => res.json())
        .then(data => setRating(data))
    }, [])
    if(playgrounds.length && rating.length) {
            // const latitude = currentPark.park_latitude
            // const longitude = currentPark.park_longitude
            // const myStyle={width:"600px", height:"450px", style:"border:0", allowfullscreen:"", loading:"lazy"}
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
            const officialEvents = parkEvents.filter(event => event.park_name === currentPark.park_name)
            const filteredEvents = events.filter( event => event.park_id === currentPark.id).reverse()
            const bBallCheck = bBallCourt.filter(park => park.name === currentPark.park_name).length === 0 ? "X" : "✓"
            const bbqAreaCheck = bbqArea.filter(park => park.name === currentPark.park_name).length === 0 ? "X" : "✓"
            const dogAreaCheck = dogAreas.filter(park => park.name.includes(currentPark.park_name)).length === 0 ? "X" : "✓"
            const runTrackCheck = runTracks.filter(park => park.name.includes(currentPark.park_name)).length === 0 ? "X" : "✓"
            const handBallCheck = handBallCourt.filter(park => park.name.includes(currentPark.park_name)).length === 0 ? "X" : "✓"

            return (
                <div className='specificPark'>
                    <h1 style={{paddingTop:'65px'}}>{currentPark.park_name}</h1>
                    <div className={'firstHolder'}>
                        <div className={'secondHolder'}>
                            <div className={'amenities'}>
                                <h4>Amenities:</h4>
                                <h4>Basketball Courts: {bBallCheck}</h4>
                                <h4>Bbq Area: {bbqAreaCheck}</h4>
                                <h4>Dog Area: {dogAreaCheck}</h4>
                                <h4>Running Track: {runTrackCheck}</h4>
                                <h4>HandBall Courts: {handBallCheck}</h4>
                            </div>
                            <div>
                                <h3>Cleanliness: <Rating icon='star' size='large' defaultRating={overAllClean} maxRating={5} disabled /></h3>
                                <h3>Location: <Rating  icon='star' size='large' defaultRating={overAllLoca} maxRating={5} disabled /></h3>
                                <h3>Amenities: <Rating icon='star' size='large' defaultRating={overAllAmen} maxRating={5} disabled /></h3>    
                                <Ratingmodal currentPark={currentPark}/>
                            </div>
                        </div>
                        <div>
                        <SpecificMap park={currentPark} type={parkIcons}/>
                        </div>
                    </div>
                        <br/>
                        <CommunityEventModal events={events} currentPark={currentPark}/>
                        <Tabs className={"tabs"} defaultActiveKey={"Community Events"} transition={false} id={"noanim-tab-example"}>
                        <Tab style={{paddingBottom:'80px'}}eventKey={"Community Events"} title={"Community Events"} >
                            {filteredEvents.length === 0 ? (
                                <h3 style={{paddingBottom: '290px'}}>Sorry, No Community Events for this park right now</h3>
                            ) : (
                            filteredEvents.map((event, i) => <EventCard filteredEvents={filteredEvents}key={i} event={event} currentPark={currentPark} />
                            )
                        )}
                        </Tab>
                        <Tab style={{paddingBottom:'80px'}}eventKey={"NYC Parks EVents"} title={"NYC Parks Events"}>
                            {officialEvents.length === 0 ? (
                            <h3 style={{paddingBottom: '290px'}}>Sorry, No NYC Parks Events for this park right now</h3>
                            ) : (
                                officialEvents.map((event, i) => <LargeEventsCard key={i} event={event}/> )
                            )}
                        </Tab>
                        </Tabs>
                </div>
            )
    }else {
        return null
    }
}

export default SpecificPark