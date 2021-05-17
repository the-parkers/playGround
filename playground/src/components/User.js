import Button from "./Button"

function User({src,text}) {
    return (
        <div>
            <img src={src} alt={"oh no"}/>
            <h3>{text}</h3> 
            <Button className="editProfile" text="Edit Profile"/>
        </div>
    )
}

export default User
