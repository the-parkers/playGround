import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext, useState} from 'react'
// import Button from "./Button"
import {Link,useHistory} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

function SignUpPage() {
    let history = useHistory();
     const context = useContext(PlayGroundContext)
     const [file,setFile] = useState([])
     const {email,firstName,lastName,password,setEmail,setFirstName,setLastName,setPassword} = context
     const handleFileUpload = (e) => {
        let {files} = e.target
        files = files[0]
        setFile(files)
    }
     function handleSubmit(e) {
        e.preventDefault()
        const formData = {
           email,
           password,
           firstName,
           lastName
        }
        const formImgData = new FormData();
        formImgData.append('imageUpload', file)
        formImgData.append('formData', JSON.stringify(formData))
        const option = {
           mode:'cors',
           method: 'POST',
             body: formImgData
       }
      fetch("http://localhost:5000/signUp", option)
      .then(response => response.json())
      .then(data => {
          if(data.Message) {
              alert(data.Message)
          }else{
            localStorage.setItem("user",  JSON.stringify({Token:data.Token,User:data.User}))
            history.push('/parks')
          }
      })
    }
    return (
        <div className="welcomeImage">
            <div className="signUpPage">
                <Logo/>
                <form onSubmit={handleSubmit}>
                    <UserInput type="text" value={firstName} setValue={setFirstName} id="FirstName" label="FirstName"/>
                    <UserInput type="text" value={lastName} setValue={setLastName} id="LastName" label="LastName"/>
                    <UserInput type="email" value={email} setValue={setEmail} id="Email" label="Email"/>
                    <UserInput type="password" value={password} setValue={setPassword} id="Password" label="Password"/>
                    <input id="file-input" type="file" name="profileImage" onChange={handleFileUpload}  accept="image/*"/>
                    <br/>
                    <Button primary className="signUpButton">Sign Up</Button>
                </form>
                <br/>

                {/* <span>Already have an account?</span> */}
                <Link to={'/'}>
                <Button secondary  className="loginButton">Login</Button>
                </Link>
            </div>
        </div>
        
    )
}

export default SignUpPage