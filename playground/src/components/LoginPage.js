import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext} from 'react'
import Button from "./Button"
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import {form} from 'react-bootstrap/Form'
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
                localStorage.setItem("token", data.Token)
                history.push("/parks")
            }else {
                console.log('invalid credentials')
            }
        })
    }
    return (
       <div>
            <Logo/>
            <form onSubmit={handleSubmit}>
             
                <UserInput type="email" value={email} setValue={setEmail} id="loginEmail" label="Email" />
                <UserInput type="password" value={password} setValue={setPassword} id="loginPassword" label="Password" />
                <Button className="loginButton" text="Login"/>
            
            </form>
            <br/>
            <span>Don't have an account?</span>
            <Link to={`/signUp`}>
                <Button className="signUpButton" text="Create New Account"/>
            </Link>
       </div>
   )
}

export default LoginPage
