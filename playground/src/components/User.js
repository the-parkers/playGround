import { Image } from 'semantic-ui-react'
import EditProfileModal from './EditProfileModal'

function User({src,text}) {
   const handleFileUpload = (e) => {
        let {files} = e.target
        files = files[0]
        const formData = new FormData();
        formData.append('imageUpload', files)
        const options = {
            method: 'POST',
            body: formData
        }
        fetch('http://localhost:5000/imageUpload', options)
      }
    return (
        <div className="profileInfo">
            <div className="image-upload">
            <label htmlFor="file-input" className="fluid">
               <Image src={src} size='small' alt={"oh no"} circular id='profileImage' className="left floated"/>
            </label>

            <input id="file-input" type="file" name="profileImage" onChange={handleFileUpload} accept="image/*"/>
            </div>
            <div>
                <div className="userProfileName">
                    <h4>{text}</h4> 
                </div>
                <EditProfileModal/>
            </div>
            
        </div>
    )
}

export default User
