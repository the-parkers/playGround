import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'


function SpecificPark(){
    let { parkName } = useParams()
    let { playgrounds } = useContext(PlayGroundContext)

    const currentPark = playgrounds.find(park => park.properties.name311 === parkName)
    const latitude = currentPark.geometry.coordinates[0][0][0][0]
    const longitude = currentPark.geometry.coordinates[0][0][0][1]
    console.log(latitude, longitude)
    const myStyle={width:"600px", height:"450px", style:"border:0;", allowfullscreen:"", loading:"lazy"}
    return (
        <div>
            <h1>{currentPark.properties.name311}</h1>
            <iframe title={"map"} src={`https://maps.google.com/maps?q=${longitude}, ${latitude}&z=15&output=embed`} style={myStyle}></iframe>
        </div>
    )
}

export default SpecificPark