import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext,useEffect} from 'react'
// import Button from "./Button"
import { Button } from 'semantic-ui-react'
import {Link,useHistory} from 'react-router-dom'

// import {form} from 'react-bootstrap/Form'
function LoginPage() {
    let history = useHistory();
    const context = useContext(PlayGroundContext)
    const {email,password,setEmail,setPassword} = context
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
           email,
           password
        }
        const option = {
            mode:'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(formData)
        }
        fetch("http://localhost:5000/login", option)
        .then(response => response.json())
        .then(data => {
            if(data.Auth){
                localStorage.setItem("user", JSON.stringify({Token:data.Token,User:data.User}))
                history.push('/parks')
            }else {
                console.log('invalid credentials')
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
              history.push('/parks')
          }
        })
        }else {
          history.push('/')
        }
      },[history])
    return (
    <div className="welcomeImagelogin">
       <div className="loginPage">
            <Logo/>
            <form onSubmit={handleSubmit}>
             
                <UserInput type="email" value={email} setValue={setEmail} id="loginEmail" label="Email" />
                <UserInput type="password" value={password} setValue={setPassword} id="loginPassword" label="Password" />
                <Button className="loginButtonPage" primary>Login</Button>
            </form>
            {/* <span>Don't have an account?</span> */}
            <br/>
            <Link to={`/signUp`}>
                <Button className="signUpButton" secondary text="Create New Account">Create New Account</Button>
            </Link>
       </div>
    </div>
   )
}

export default LoginPage
