import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'

function Parkcard(props){
    const {Park} = props
    return (
        <Link to={`/parks/${Park.park_name}`}>
            <Card className="park_cards" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg/1200px-Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg.png" />
                <Card.Body>
                    <Card.Title>{Park.park_name}</Card.Title>
                    <Card.Text>
                        {Park.park_location}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default Parkcard