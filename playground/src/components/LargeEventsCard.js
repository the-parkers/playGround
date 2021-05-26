import Card from 'react-bootstrap/Card'

function LargeEventsCard(props){
    return (
        <div style={{ display: 'flex', margin:'15px', justifyContent:'center'}}>
            <Card style={{ width: '30rem' }}>
                <div>
                    <h2>{props.event.title}</h2>
                    <h5>Date: {props.event.startdate}</h5>
                    <h5>Meeting Spot: {props.event.location}</h5>
                    <h5>Times: {props.event.starttime} - {props.event.endtime}</h5>
                </div>
            </Card>    
            <img style={{ height: '15rem', width:'25rem'}}src={props.event.image} alt=""/>
        </div>
    )
}

export default LargeEventsCard