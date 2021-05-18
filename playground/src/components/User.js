import Button from "./Button"
import { Image } from 'semantic-ui-react'

function User({src,text}) {
    return (
        <div className="profileInfo">
            <div className="image-upload">
            <label htmlFor="file-input" className="fluid">
               <Image src={src} size='medium' alt={"oh no"} circular id='profileImage' className="left floated"/>
            </label>

            <input id="file-input" type="file" />
            </div>
            <div>
                <h3>{text}</h3> 
                <Button className="editProfile" text="Edit Profile"/>
            </div>
            
        </div>
    )
}

export default User
