import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext} from 'react'
import Button from "./Button"
import {Link} from 'react-router-dom'

function LoginPage() {
    const context = useContext(PlayGroundContext)
    const {email,password,setEmail,setPassword} = context
    function handleSubmit(e) {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        const option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
            method : 'POST',
            body : JSON.stringify(formData)
        }
        fetch("http://localhost:5000/login", option)
    }
    return (
       <div>
            <Logo/>
            <form onSubmit={handleSubmit}>
                <UserInput type="email" value={email} setValue={setEmail} id="loginEmail" label="Email"/>
                <UserInput type="password" value={password} setValue={setPassword} id="loginPassword" label="Password"/>
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
