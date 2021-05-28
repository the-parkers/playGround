import User from "./User"
// import { Route, Switch } from "react-router";
// import Favorites from "./Favorites";
// import Events from "./Events"
// import {Params} from 'react-router-dom'
import {Tabs, Tab} from 'react-bootstrap'
import {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import PlayGroundContext from '../context/PlayGroundContext'
import { Card } from 'semantic-ui-react';
import {Helmet} from 'react-helmet';
import EventCard from './EventCard'

function UserPage() {
    const context = useContext(PlayGroundContext)
    const {userFavorites, events} = context
    const [userProfile,setUserProfile] = useState({})
    let history = useHistory()
    useEffect(()=> {
      const user = localStorage.getItem('user')
      if(user) {
      const options = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: user
      }
      fetch('http://localhost:5000/verifySession',options)
      .then(response => response.json())
      .then(data => {
        if(!data.Auth) {
          history.push('/')
        } else {
          delete data.User.first_name
          delete data.User.last_name
          delete data.User.email
          console.log(data)
            const content = Buffer.from(data.User.user_image.data)
            const string64 = content.toString('base64')
            setUserProfile((prev) => ({...prev,id:data.User.id, user_image: `data:image/png;base64,${string64}`}))
        }
      })
      }else {
        history.push('/')
      }
    },[history])
    const currentUserEvents = events.filter(event => event.user_id === userProfile.id)
    return (
        <div>
            <Helmet>
              <style>{'body { background-color: #FFF5EE; }'}</style>
            </Helmet>
            <div>
            <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
            <div>
            <Tabs className="tabs" defaultActiveKey="Favorited Parks" id="uncontrolled-tab-example" style={{display: 'flex',aligntems: 'center',marginTop: '40px'}}>
              <Tab className="favoriteTab" eventKey="Favorited Parks" title="Favorited Parks" style={{width: '1000px', display: 'flex', position: 'absolute',marginLeft: '448px',marginTop: '25px'}}>
                <br/>
                <Card.Group centered>
                {userFavorites.map((favs) => {
                return  <Card style={{ fontFamily: "Poppins, sans-serif", width: '20rem', margin: '20px'}} key={favs.id}>
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
              {currentUserEvents.map((event, i) => {
                return <EventCard key={i} event={event}/> 
                }       
                )}
                </Card.Group>
                </>
              </Tab>
            </Tabs>
          </div>
          </div>
        </div>
    )
}

export default UserPage
