import { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'

function CommunityEventModal(props){
    const [modalShow, setModalShow] = useState(false);
    // const [confirm, setConfirm] = useState(false)
    const [title, settitle] = useState("")
    const [description, setDescription] = useState("")
    const [eventLoco, setEventLoco] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [date, setDate] = useState("")
    const [buffer, setBuffer] = useState([])
    function eventSubmit(e){
        e.preventDefault()
        setModalShow(!modalShow)
        const formData = {
            // user:,
            park:props.currentPark.park_name,
            title,
            description,
            eventLoco,
            startTime,
            endTime,
            date,
            buffer
        }
        // const options = {
        //     mode:'cors',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //         },
        // body: JSON.stringify(formData)
        // }
        // fetch()
        console.log(formData)
    }
    return (
        <div>
        <Button onClick={() => setModalShow(!modalShow)}>New Community Event!</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>{props.currentPark.park_name}</Modal.Header>
            <form onSubmit={eventSubmit}>
            <Modal.Body>
                <h4 htmlFor="title">Name of your Event</h4>
                <input type="text" name="title" value={title} onChange={(e) => {settitle(e.target.value)}} required/>
                <h4 htmlFor="description">Description of the Event</h4>
                <textarea name="description" value={description} onChange={(e) => {setDescription(e.target.value)}} required></textarea>
                <h4 htmlFor="location">Where in the Park</h4>
                <input type="text" name="location" value={eventLoco} onChange={(e) => {setEventLoco(e.target.value)}} required/>
                <h4 htmlFor="startTime">Start Time</h4>
                <input type="time" name="startTime" value={startTime} onChange={(e) => {setStartTime(e.target.value)}} required/>
                <h4 htmlFor="endTime">End Time</h4>
                <input type="time" name="endTime" value={endTime} onChange={(e) => {setEndTime(e.target.value)}} required/>
                <h4 htmlFor="date">Day of The Event</h4>
                <input type="date"name="date" value={date} onChange={(e) => {setDate(e.target.value)}} required/>
                <h4 htmlFor="image">Post an Image</h4>
                <input type="file" name="image" onChange={(e) => {setBuffer(e.target.files[0])}} accept="image/*"/>
            </Modal.Body>
                <Modal.Footer>
                    <span>All Good?</span>
                <Button type={"submit"}>Publish New Event</Button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>
    )
}

export default CommunityEventModal