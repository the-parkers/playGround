import { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { useContext } from 'react'
import PlayGroundContext from '../context/PlayGroundContext'

function CommunityEventModal(props){
    const [modalShow, setModalShow] = useState(false);
    let { setEvents } = useContext(PlayGroundContext)
    const [title, settitle] = useState("")
    const [description, setDescription] = useState("")
    const [location, setEventLoco] = useState("")
    const [starttime, setStartTime] = useState("")
    const [endtime, setEndTime] = useState("")
    const [startdate, setDate] = useState("")
    const [buffer, setBuffer] = useState([])
    const handleBufferUpload = (e) => {
        let {files} = e.target
        files = files[0]
        setBuffer(files)
    }
    function eventSubmit(e){
        e.preventDefault()
        
        setModalShow(!modalShow)
        const token = JSON.parse(localStorage.getItem("user"))
        const formData = {
            user_id: token.Token,
            park_name:props.currentPark.park_name,
            park_id:props.currentPark.id,
            title,
            description,
            location,
            starttime,
            endtime,
            startdate
        }
        const formImgData = new FormData();
        formImgData.append('imageUpload', buffer)
        formImgData.append('formData', JSON.stringify(formData))
        const options = {
            mode:'cors',
            method: 'POST',
            body: formImgData
        }
        fetch("http://localhost:5000/eventSubmit", options)
        .then(res => res.json())
        .then(data => {setEvents((prev) => [...prev, data[0]])})}
    return (
        <div>
        <Button onClick={()=>setModalShow(!modalShow)}>New Community Event!</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>{props.currentPark.park_name}</Modal.Header>
            <form onSubmit={eventSubmit}>
            <Modal.Body>
                <h4 htmlFor="title">Name of your Event</h4>
                <input type="text" name="title" value={title} onChange={(e) => {settitle(e.target.value)}} required/>
                <h4 htmlFor="description">Description of the Event</h4>
                <textarea name="description" value={description} onChange={(e) => {setDescription(e.target.value)}} required></textarea>
                <h4 htmlFor="location">Where in the Park</h4>
                <input type="text" name="location" value={location} onChange={(e) => {setEventLoco(e.target.value)}} required/>
                <h4 htmlFor="starttime">Start Time</h4>
                <input type="time" name="starttime" value={starttime} onChange={(e) => {setStartTime(e.target.value)}} required/>
                <h4 htmlFor="endtime">End Time</h4>
                <input type="time" name="endtime" value={endtime} onChange={(e) => {setEndTime(e.target.value)}} required/>
                <h4 htmlFor="startdate">Day of The Event</h4>
                <input type="date"name="startdate" value={startdate} onChange={(e) => {setDate(e.target.value)}} required/>
                <h4 htmlFor="image">Post an Image</h4>
                <input type="file" name="image" onChange={handleBufferUpload} accept="image/*"/>
                <h5>*If you expect for there to be more than 20 people at an event then a permit will be required, you can apply for a permit with the link below</h5>
                <a href="https://nyceventpermits.nyc.gov/parks/Login.aspx?ReturnUrl=%2fParks%2f" target="_blank" rel="noopener noreferrer">Permit Link</a>
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