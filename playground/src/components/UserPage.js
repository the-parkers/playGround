import Button from "./Button"
import User from "./User"

function UserPage() {
    const switchTab = () => {
        console.log('click')
    }
    return (
        <div>
            <User src="https://semantic-ui.com/images/avatar/small/jenny.jpg" text="Test User"/>
            <Button text="Favorites" className="favoriteTab" click={switchTab}/>
            <Button text="Events" className="eventsTab" click={switchTab}/>
            <div></div>
            
        </div>
    )
}

export default UserPage
