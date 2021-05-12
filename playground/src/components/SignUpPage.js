import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext} from 'react'
import Button from "./Button"
import {Link} from 'react-router-dom'

function SignUpPage() {
     const context = useContext(PlayGroundContext)
     const {email,firstName,lastName,password,setEmail,setFirstName,setLastName,setPassword} = context
    return (
        <div>
            <Logo/>
            <UserInput type="text" value={firstName} setValue={setFirstName} id="FirstName" label="FirstName"/>
            <UserInput type="text" value={lastName} setValue={setLastName} id="LastName" label="LastName"/>
            <UserInput type="email" value={email} setValue={setEmail} id="Email" label="Email"/>
            <UserInput type="password" value={password} setValue={setPassword} id="Password" label="Password"/>

                <Button className="signUpButton" text="Sign Up"/>
            <br/>
            <span>Already have an account?</span>
            <Link to={'/'}>
                <Button className="loginButton" text="Login"/>
            </Link>
        </div>
    )
}

export default SignUpPage