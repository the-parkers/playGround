import User from "./User"
// import { Route, Switch } from "react-router";
// import Favorites from "./Favorites";
// import Events from "./Events"
// import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import {useContext} from 'react';
import PlayGroundContext from '../context/PlayGroundContext'
import { Card } from 'semantic-ui-react';
import EventCard from './EventCard'

function UserPage() {
    const context = useContext(PlayGroundContext)
    const {userFavorites, events} = context
    return (
        <div>
            <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
        <Tabs className="tabs" defaultActiveKey="Favorited Parks" id="uncontrolled-tab-example">
  <Tab className="favoriteTab" eventKey="Favorited Parks" title="Favorited Parks">
      <br/>
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
  </Tab>
  <Tab className="userEventsTab" eventKey="Your Events" title="Your Events">
  <>
            <Card.Group centered>
            {events.map((event, i) => {
            return <EventCard key={i} event={event}/> 
            }       
            )}
            </Card.Group>
            </>
  </Tab>

</Tabs>
        </div>
    )
}

export default UserPage
