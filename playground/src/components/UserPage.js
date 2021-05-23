import Button from "./Button"
import User from "./User"
import { Route, Switch } from "react-router";
import Favorites from "./Favorites";
import Events from "./Events"
import {Link} from 'react-router-dom'
import {useState} from 'react'

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
    const [favEvents, setFavEvents] = useState(true)
    const switchTab = () => {
        console.log(favEvents)
        // if(favEvents === ){

        // }
        setFavEvents(!favEvents) 
    }
    
    return (
        <div>
            <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
                <Button text="Favorites" className="favoriteTab" click={switchTab}/> 
                <Button text="Events" className="eventsTab" click={switchTab}/>
            <div>
                
                {/* <Switch>
                    <Route path={["/favorites"]} component={Favorites} />
                    <Route path="/events" component={Events} />
                </Switch> */}
            </div>
            <div style={style}>
            {favEvents ? <h1>My Favorite Parks</h1> : <h1>Events Section</h1>}
        </div>
        </div>
    )
}

export default UserPage
