import Button from "./Button"
import { Image } from 'semantic-ui-react'


function User({src,text}) {
   const handleFileUpload = (e) => {
        const {files} = e.target
        const options = {
            method: 'post',
            body: files
        }
        fetch('localhost:5000/imageUpload', options)
        console.log(files)

      }
    return (
        <div className="profileInfo">
            <div className="image-upload">
            <label htmlFor="file-input" className="fluid">
               <Image src={src} size='medium' alt={"oh no"} circular id='profileImage' className="left floated"/>
            </label>

            <input id="file-input" type="file" onChange={handleFileUpload} accept="image/*"/>
            </div>
            <div>
                <h3>{text}</h3> 
                <Button className="editProfile" text="Edit Profile"/>
            </div>
            
        </div>
    )
}

export default User
