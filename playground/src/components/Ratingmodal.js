import { useEffect, useState } from 'react'
import {Button, Modal} from 'react-bootstrap'

function Ratingmodal(props){
    const [modalShow, setModalShow] = useState(false);
    // const [confirm, setConfirm] = useState(false)
    const [cleanRate, setCleanRate] = useState(1)
    const [locoRate, setLocoRate] = useState(1)
    const [amenRate, setAmenRate] = useState(1)
    function ratingSubmit(e){
        e.preventDefault()
        setModalShow(!modalShow)
        const token = JSON.parse(localStorage.getItem("user"))
        const formData = {
            user_id: token.Token,
            park_id: props.currentPark.id,
            cleanliness_rating: Number(cleanRate),
            amenities_rating: Number(amenRate),
            location_rating: Number(locoRate)
        }
        const options = {
            mode:'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
        body: JSON.stringify(formData)
        }
        fetch("http://localhost:5000/ratingSubmit", options)
        .then(res => res.json())
        .then(data => console.log(data))
        console.log(formData)
    }
    useEffect(() => {

    }, [])
    return (
        <div>
        <Button onClick={() => setModalShow(!modalShow)}>Give a Rating!</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>New Event at {props.currentPark.park_name}</Modal.Header>
            <form onSubmit={ratingSubmit}>
            <Modal.Body>
                <h4 htmlFor={"cleanliness"}>Cleanliness</h4>
                <input type={"number"} name={"cleanliness"} value={cleanRate} onChange={(e) => {setCleanRate(e.target.value)}} min={"1"} max={"5"} required/>
                <h4>Location</h4>
                <input type={"number"} name={"location"} value={locoRate} onChange={(e) => {setLocoRate(e.target.value)}} min={"1"} max={"5"} required/>
                <h4>Amenities</h4>
                <input type={"number"} name={"amenities"} value={amenRate} onChange={(e) => {setAmenRate(e.target.value)}} min={"1"} max={"5"} required/>
            </Modal.Body>
                <Modal.Footer>
                <Button type={"submit"}>Submit Rating</Button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>
    )
}

export default Ratingmodal