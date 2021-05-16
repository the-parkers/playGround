import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'


function SpecificPark(){
    let { parkName } = useParams()
    let { playgrounds } = useContext(PlayGroundContext)

    const currentPark = playgrounds.find(park => park.properties.name311 === parkName)
    const latitude = currentPark.geometry.coordinates[0][0][0][0]
    const longitude = currentPark.geometry.coordinates[0][0][0][1]
    console.log()
    const myStyle={width:"600px", height:"450px", style:"border:0;", allowfullscreen:"", loading:"lazy"}
    return (
        <div>
        <h1>{currentPark.properties.name311}</h1>
        <iframe title={"map"} src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.7328411542617!2d${latitude}!3d${longitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzExLjAiTiAxMjLCsDI4JzQzLjAiVw!5e0!3m2!1sen!2sus!4v1621205091939!5m2!1sen!2sus`} style={myStyle}></iframe>
        </div>
    )
}

export default SpecificPark