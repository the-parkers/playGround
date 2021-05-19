import User     from './User';
import {Link}   from 'react-router-dom';
import Button   from "./Button";

const style = {
    background: 'lightgrey',
    border: '4px solid black',
    height: '500px',
    width: '1300px',
    marginLeft: 'auto',
    marginRight: "auto",
    fontWeight: 900,
};
function Favorites(){
    const switchTab = () => {
        console.log('click')
    }
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
            <h1>Favorites Section</h1>
        </div>
       
      </>
    )
  }
  
  export default Favorites