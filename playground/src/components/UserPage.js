import Button from "./Button"
import User from "./User"
import { Route, Switch } from "react-router";
import Favorites from "./Favorites";
import Events from "./Events"
import {Link} from 'react-router-dom'


function UserPage() {
    const switchTab = () => {
        console.log('click')
    }
    return (
        <div>
            <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
            <Link to={`/favorites`}>
                <Button text="Favorites" className="favoriteTab" click={switchTab}/> {' '}
            </Link>
            <Link to={`/events`}>
                <Button text="Events" className="eventsTab" click={switchTab}/>
            </Link>
            <div>
                
                <Switch>
                    <Route path={["/favorites"]} component={Favorites} />
                    <Route path="/events" component={Events} />
                </Switch>
            </div>
            
        </div>
    )
}

export default UserPage
