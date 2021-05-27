import { Icon,Rating } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import {  useEffect, useState } from 'react'
import CardMap from './CardMap'



// function Parkcard(props){
//     const {Park ,search} = props
    
//     function postFavorite(e){
//         const user = JSON.parse(localStorage.getItem('user'))
//         const formData = {
//             park_id: Park.id,
//             user_id: user.Token
//         }
//         e.target.classList.value = 'heart link icon'
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         }
//         fetch('http://localhost:5000/postFavorite', options)
// import User from './User'

function Parkcard({Park ,search, userFavs,icons,type} ){
    const [rating, setRating] = useState([])
    const favs = userFavs.filter(favorite => 
        favorite.park_id === Park.id
        )
    let iconHeart = false;
    if(favs.length) {
        iconHeart = true;
    } 
    function deleteFavorite(obj){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj[0])
        }
        fetch('http://localhost:5000/deleteFavorite', options)
    }
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
    overAllClean = Math.floor((cleanRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllLoca = Math.floor((locaRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllAmen = Math.floor((amenRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)       
    
    

    function test(e){
        if(e.target.classList.value === "heart outline link icon"){
                postFavorite()
                e.target.classList.value = "heart link icon"
        } else {
            deleteFavorite(favs)
            e.target.classList.value =  "heart outline link icon"
        }
    }
    //${Park.park_longitude},${Park.park_latitude}
    // console.log( Park.park_longitude,Park.park_latitude)
    if(rating.length !== 0){

        return (
                <Card onClick={e => search('')} className="park_cards" style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={`https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=AIzaSyCHfmO773ZfgPu3ZQ5_-1bgQO2N4GCGFjQ`} /> */}
{/* <img src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.14227319856263,40.54219614399445/500x300?access_token=pk.eyJ1IjoibWFpbjEwMDEiLCJhIjoiY2twNXY3M2M2MDBrNjJ0bnB6bnQwMDFodSJ9.IopWpHMsK0E82qltV8SOew" alt="Map of the Edmund Pettus Bridge in Selma, Alabama, with a black 'L' marker positioned in the middle of the bridge.`}/> */}
                    {/* <iframe width="250" title='cardMap' height="300" style={{border:0}} loading="quick" allowfullscreen src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCHfmO773ZfgPu3ZQ5_-1bgQO2N4GCGFjQ&center=${Park.park_latitude},${Park.park_longitude}&zoom=18`}></iframe> */}
                     <CardMap park={Park} type={type}/>
                    <Link to={`/parks/${Park.id}`}>
                    <Card.Title onClick={e => search('')}>{Park.park_name}</Card.Title>
                    </Link>
                    <Card.Body>
                        <Card.Text> 
                           {Park.location ?  Park.location : Park.park_location}
                        </Card.Text>
                        <Card.Subtitle>
                            {Park.subcategory} {`${Park.distance.toFixed(1)} KM`}
                            {Park.dogruns_type ? ` DogRunType: ${Park.dogruns_type}` : Park.track_type ? ` TrackType: ${Park.track_type} TrackSize: ${Park.size}` : Park.court_count ? ` CourtCount: ${Park.court_count}`: Park.pool_size ? ` PoolSize: ${Park.pool_size} PoolType: ${Park.pool_type}` : null}
                            <hr/>
                             {/* <Icon link name='heart outline' onClick={postFavorite}/> */}
                            {/* <Icon link name='heart outline' onClick={}/> */}
                            <h4>Cleanliness: <Rating  size='small' defaultRating={overAllClean} maxRating={5} disabled /></h4>
                            <h4>Location: <Rating   size='small' defaultRating={overAllLoca} maxRating={5} disabled /></h4>
                            <h4>Amenities: <Rating  size='small' defaultRating={overAllAmen} maxRating={5} disabled /></h4>
                            <Icon link name = {(iconHeart ? 'heart': 'heart outline')} onClick={test}  />
                        </Card.Subtitle>
                    </Card.Body>
                </Card>  
        )
    }else{
        return null
}
}


export default Parkcard