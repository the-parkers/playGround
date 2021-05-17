import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'


function SpecificPark(){
    let { parkName } = useParams()
    let { playgrounds } = useContext(PlayGroundContext)

    const currentPark = playgrounds.find(park => park.park_name === parkName)
    const latitude = currentPark.park_latitude
    const longitude = currentPark.park_longitude
    const myStyle={width:"600px", height:"450px", style:"border:0", allowfullscreen:"", loading:"lazy"}
    return (
        <div>
            <h1>{currentPark.park_name}</h1>
            <iframe title={"map"} src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`} style={myStyle}></iframe>
        </div>
    )
}

export default SpecificPark