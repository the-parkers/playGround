import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext} from 'react'
import Button from "./Button"

function LoginPage() {
    const context = useContext(PlayGroundContext)
    const {email,password,setEmail,setPassword} = context
   return (
       <div>
           <Logo/>
           <UserInput type="email" value={email} setValue={setEmail} id="loginEmail" label="Email"/>
           <UserInput type="password" value={password} setValue={setPassword} id="loginPassword" label="Password"/>
           <Button className="loginButton" text="Login"/>
           <br/>
           <Button className="signUpButton" text="Sign Up"/>
       </div>
   )
}

export default LoginPage
