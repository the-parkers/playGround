import { Button } from 'semantic-ui-react'
import Card from 'react-bootstrap/Card'
import EditEventModal from './EditEventModal'

function EventCard(props){
    const {event,currentPark} = props
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
    <div  style={{ display: 'flex', margin:'15px', justifyContent:'center'}}>
        <Card className="eventCard" style={{ fontFamily: "Poppins, sans-serif", width: '30rem', margin: '0px' }}>
            <div>
            <h2>{event.title}</h2>
            <h4>{event.description}</h4>
            <h5>Date: {date}</h5>
            <h5>Meeting Spot: {event.location}</h5>
            <h5>Times: {timeValue} - {timeValues}</h5>
            <EditEventModal events={event} currentPark={currentPark}/>
            {/* <Button onClick={() => {}}>Edit</Button> */}
            </div>
        </Card>    
        <img style={{ height: '15rem', width:'25rem'}}src={image} alt=""/>
        </div>
    )
}

export default EventCard