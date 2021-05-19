import User                   from './User';
import {Link}                 from 'react-router-dom';
import Button                 from "./Button";
import { useContext }         from 'react';
import Parkcard               from './ParkCard';
import PlayGroundContext      from '../context/PlayGroundContext';

const style = {
    background: 'lightgrey',
    border: '4px solid black',
    height: '500px',
    width: '1300px',
    marginLeft: 'auto',
    marginRight: "auto",
    fontWeight: 900,
};
function Favorites(props){
    // console.log(props)
    const switchTab = () => {
        console.log('click')
    }
    const context = useContext(PlayGroundContext)
    let {favorite, setFavorites} = context

    return (
      <>
        <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
        <Link to={`/favorites`}>
            <Button text="Favorites" className="favoriteTab" click={switchTab}/>
        </Link>
        <Link to={`/events`}>
            <Button text="Events" className="eventsTab" click={switchTab}/>
        </Link>
        <div style={style}>
            <h1>My Favorite Parks</h1>
            {/* UI list of parks, each park on a card, each park card links to park profile page, *park homepage should have ability to ❤️ a park*, ❤️ feature as well (when pressed on favs section removes the card from the favorites section)  */}

            
        </div>
       
      </>
    )
  }
  
  export default Favorites