import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext} from 'react'
import Button from "./Button"
import {Link,useHistory} from 'react-router-dom'

function SignUpPage() {
    let history = useHistory();
     const context = useContext(PlayGroundContext)
     const {email,firstName,lastName,password,setEmail,setFirstName,setLastName,setPassword} = context
     function handleSubmit(e) {
        e.preventDefault()
        const formData = {
           email,
           password,
           firstName,
           lastName
        }
        const option = {
           mode:'cors',
           method: 'POST',
             headers: {
               'Content-Type': 'application/json'
            },
             body: JSON.stringify(formData)
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
        <div>
            <Logo/>
            <form onSubmit={handleSubmit}>
                <UserInput type="text" value={firstName} setValue={setFirstName} id="FirstName" label="FirstName"/>
                <UserInput type="text" value={lastName} setValue={setLastName} id="LastName" label="LastName"/>
                <UserInput type="email" value={email} setValue={setEmail} id="Email" label="Email"/>
                <UserInput type="password" value={password} setValue={setPassword} id="Password" label="Password"/>
                <Button className="signUpButton" text="Sign Up"/>
             </form>
            <br/>
            <span>Already have an account?</span>
            <Link to={'/'}>
                <Button className="loginButton" text="Login"/>
            </Link>
        </div>
    )
}

export default SignUpPage