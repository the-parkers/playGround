import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import User from './User'


function Parkcard(props){
    const {Park ,search} = props
    
    function postFavorite(e){
        const user = JSON.parse(localStorage.getItem('user'))
        const formData = {
            park_id: Park.id,
            user_id: user.Token
        }
        e.target.classList.value = 'heart link icon'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch('http://localhost:5000/postFavorite', options)
    }

    return (
        
            <Card className="park_cards" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg/1200px-Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg.png" />
                <Card.Body>
                <Link to={`/parks/${Park.id}`}>
                    <Card.Title onClick={e => search('')}>{Park.park_name}</Card.Title>
                </Link>
                    <Card.Text>
                        {Park.park_location}
                    </Card.Text>
                    <Card.Subtitle>
                        {Park.subcategory}
                        <br/>
                        <Icon link name='heart outline' onClick={function(event){ postFavorite(event);}}/>
                    </Card.Subtitle>
                </Card.Body>
            </Card>

    )
}

export default Parkcard