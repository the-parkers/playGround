import Button from "./Button"
import { Image } from 'semantic-ui-react'
import { useEffect,useState} from "react"
import { useHistory } from "react-router"


function User({src,text}) {
    const [userProfile,setUserProfile] = useState({})
    let history = useHistory()
   const handleFileUpload = (e) => {
        const user = localStorage.getItem('user')
        let {files} = e.target
        files = files[0]
        const formData = new FormData();
        formData.append('imageUpload', files)
        
        const options = {
            method: 'POST',
            headers: {
                'user': user
            },
            body: formData
        }
        fetch('http://localhost:5000/imageUpload', options)
        .then(response => response.json())
        .then(data => {
            if(data.Auth) {
                const content = Buffer.from(data.image)
                const string64 = content.toString('base64')
                setUserProfile((prev) => ({...prev, user_image: `data:image/png;base64,${string64}`}))
            }
        })
      }
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
          }else {
            delete data.User.email
            const content = Buffer.from(data.User.user_image.data)
            const string64 = content.toString('base64')
            setUserProfile((prev) => ({...prev,id:data.User.id,first_name:data.User.first_name,last_name:data.User.last_name ,user_image: `data:image/png;base64,${string64}`}))
          }
        })
        }else {
          history.push('/')
        }
      },[history])
    return (
        <div className="profileInfo">
            <div className="image-upload">
            <label htmlFor="file-input" className="fluid">
               <Image src={userProfile.user_image} size='medium' alt={"oh no"} circular id='profileImage' className="left floated"/>
            </label>

            <input id="file-input" type="file" name="profileImage" onChange={handleFileUpload} accept="image/*"/>
            </div>
            <div>
                <h3>{`${userProfile.first_name} ${userProfile.last_name}`}</h3> 
                <Button className="editProfile" text="Edit Profile"/>
            </div>
            
        </div>
    )
}

export default User
