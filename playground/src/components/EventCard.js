// import { Image } from 'semantic-ui-react'
import Card from 'react-bootstrap/Card'

function EventCard(props){
    const {event} = props
    console.log(event)
    const {starttime, endtime} = event
        let time = starttime.split(":")
        let hours = Number(time[0])
        let minutes = Number(time[1])
        let timeValue    
        if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
        } else if (hours > 12) {
            timeValue= "" + (hours - 12);
        } else if (hours === 0) {
            timeValue= "12";
        }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " pm" : " am";  // get AM/PM
    let endtimes = endtime.split(":")
    let hour = Number(endtimes[0])
    let minute = Number(endtimes[1])
    let timeValues   
    if (hour > 0 && hour <= 12) {
        timeValues= "" + hour;
    } else if (hour > 12) {
        timeValues= "" + (hour - 12);
    } else if (hour === 0) {
        timeValues= "12";
    }
    timeValues += (minute < 10) ? ":0" + minute : ":" + minute;  // get minutes
    timeValues += (hour >= 12) ? " pm" : "pm";  // get AM/PM 
    let date = event.startdate
    if(event.startdate.length > 15){
    date = date.substring(0, date.length - 14)        
    }
    let image = ""
    if(event.image){
    const content = Buffer.from(event.image)
    const string64 = content.toString('base64')
    image = `data:image/png;base64,${string64}`
    }
    return (
    <div style={{ display: 'flex', margin:'10px'}}>
        <Card style={{ width: '30rem' }}>
            <div>
            <h3>{event.title}</h3>
            <Card.Text>Times: {timeValue} - {timeValues}</Card.Text>
            <Card.Text>Date: {date}</Card.Text>
            <Card.Text>Where: {event.location}</Card.Text>
            <h4>{event.description}</h4>
            </div>
        </Card>    
        <img style={{ height: '15rem'}}src={image} alt=""/>
        </div>
    )
}

export default EventCard