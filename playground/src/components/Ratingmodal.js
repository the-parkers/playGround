import { useEffect, useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { Rating } from 'semantic-ui-react'

function Ratingmodal(props){
    const [modalShow, setModalShow] = useState(false);
    // const [confirm, setConfirm] = useState(false)
    const [cleanRate, setCleanRate] = useState(1)
    const [locoRate, setLocoRate] = useState(1)
    const [amenRate, setAmenRate] = useState(1)
    const [ratings,setRating] = useState([])
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
        fetch('http://localhost:5000/getRatings')
        .then(res => res.json())
        .then(data => {setRating(data)})
    }, [])
    if(ratings.length) {
        const filter = ratings.filter(rate => rate.park_id === props.currentPark.id)
        
        console.log(filter)
    }
    console.log(ratings,props.currentPark.id)
    return (
        <div>
        <Button onClick={() => setModalShow(!modalShow)}>Give a Rating!</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>Rate {props.currentPark.park_name}</Modal.Header>
            <form onSubmit={ratingSubmit}>
            <Modal.Body>
                <h4 htmlFor={"cleanliness"}>Cleanliness</h4>
                <Rating maxRating={5} required name="cleanliness" clearable value={cleanRate} onRate={(e,ratings) => {setCleanRate(ratings.rating)}}/>
                <h4>Location</h4>
                <Rating maxRating={5} required name="location" clearable value={locoRate} onRate={(e,ratings) => {setLocoRate(ratings.rating)}}/>
                <h4>Amenities</h4>
                <Rating maxRating={5} required name="amenities" clearable value={amenRate} onRate={(e,ratings) => {setAmenRate(ratings.rating)}}/>
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