import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext} from 'react'
import Button from "./Button"

function SignUpPage() {
     const context = useContext(PlayGroundContext)
     const {email,firstName,lastName,password,setEmail,setFirstName,setLastName,setPassword} = context
    return (
        <div>
            <Logo/>
            <UserInput type="text" value={firstName} setValue={setFirstName} id="FirstName"/>
            <UserInput type="text" value={lastName} setValue={setLastName} id="LastName"/>
            <UserInput type="email" value={email} setValue={setEmail} id="Email"/>
            <UserInput type="password" value={password} setValue={setPassword} id="Password"/>
            <Button className="loginButton" text="Login"/>
            <Button className="signUpButton" text="Sign Up"/>
        </div>
    )
}

export default SignUpPage