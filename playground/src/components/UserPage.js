import Button from "./Button"
import User from "./User"
// import { Route, Switch } from "react-router";
// import Favorites from "./Favorites";
// import Events from "./Events"
// import {Link} from 'react-router-dom'
import {useContext, useState} from 'react';
import PlayGroundContext from '../context/PlayGroundContext'
import { Card } from 'semantic-ui-react';
import EventCard from './EventCard'


const style = {
    background: 'lightgrey',
    border: '4px solid black',
    height: '500px',
    width: '1300px',
    marginLeft: 'auto',
    marginRight: "auto",
    fontWeight: 900,
};

function UserPage() {
    const context = useContext(PlayGroundContext)
    const {userFavorites, events} = context
        console.log(events)
    const [favEvents, setFavEvents] = useState(true)
    const switchTab = (e) => {
        if(e.target.className === "eventsTab"){
            setFavEvents(false) 
        } else {
            setFavEvents(true)
        } 
    }
    
    return (
        <div>
            <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
                <Button text="Favorites" className="favoriteTab" click={switchTab}/> 
                <Button text="Events" className="eventsTab" click={switchTab}/>
            <div>
            </div>
            <div style={style}>
            {favEvents ? 
            <>
            <h1>My Favorite Parks</h1> 
            <Card.Group centered>
            {userFavorites.map((favs) => {
               return  <Card key= {favs.id}>
                 <Card.Content header= {favs.park_name}  
                 description={favs.park_location}
                 meta={favs.park_borough}
                  />

                 <Card.Content extra>
                     {favs.park_zipcode}
                     <hr/> {favs.subcategory}
                   {/* <Icon name='user' />4 Friends */}
                 </Card.Content>
               </Card>
            })}
            </Card.Group>
            </>
            : 
            <>
            <h1>Events Section</h1>
            <Card.Group centered>
            {events.map((event, i) => {
            
            return <EventCard key={i} event={event}/> 
            }       
            )}
            </Card.Group>
            </>
            }
        </div>
        </div>
    )
}

export default UserPage
