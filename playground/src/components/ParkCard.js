import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
import { Icon,Rating } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
// import User from './User'

function Parkcard(props){
    const {Park ,search} = props
    const [rating, setRating] = useState([])
    function postFavorite(e){
        const user = JSON.parse(localStorage.getItem('user'))
        const formData = {
            park_id: Park.id,
            user_id: user.Token
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('http://localhost:5000/postFavorite', options)
    }
    useEffect(() => {
        fetch('http://localhost:5000/getRatings')
        .then(res => res.json())
        .then(data => {setRating(data)})
    }, [])
    const currentParkRating = rating.filter(parks => parks.park_id === Park.id)
    const cleanRate = []
    const locaRate = []
    const amenRate = []
    currentParkRating.forEach(rating => {
        cleanRate.push(rating.cleanliness_rating)
        locaRate.push(rating.location_rating)
        amenRate.push(rating.amenities_rating)
    })
    let overAllClean = 5
    let overAllLoca = 5
    let overAllAmen = 5
    if(rating.length !== 0){
    overAllClean = Math.floor((cleanRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllLoca = Math.floor((locaRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllAmen = Math.floor((amenRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)       
    
    function test(e){
        e.target.classList.value = 'heart link icon'
        postFavorite()
    }
    
    
        return (
                <Card onClick={e => search('')} className="park_cards" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg/1200px-Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg.png" />
                    <Link to={`/parks/${Park.id}`}>
                    <Card.Title onClick={e => search('')}>{Park.park_name}</Card.Title>
                    </Link>
                    <Card.Body>
                        <Card.Text>
                            {Park.park_location}
                        </Card.Text>
                        <Card.Subtitle>
                            {Park.subcategory} {`${Park.distance.toFixed(1)} KM`}
                            <hr/>
                            {/* <Icon link name='heart outline' onClick={}/> */}
                            <h4>Cleanliness: <Rating  size='small' defaultRating={overAllClean} maxRating={5} disabled /></h4>
                            <h4>Location: <Rating   size='small' defaultRating={overAllLoca} maxRating={5} disabled /></h4>
                            <h4>Amenities: <Rating  size='small' defaultRating={overAllAmen} maxRating={5} disabled /></h4>
                            <Icon link name='heart outline' onClick={test} />
                        </Card.Subtitle>
                    </Card.Body>
                </Card>  
        )
    }else{
       return null
}
}


export default Parkcard