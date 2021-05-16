import Logo              from "./Logo";
import UserInput         from "./UserInput";
import PlayGroundContext from '../context/PlayGroundContext';
import {useContext}      from 'react';
import Button            from "./Button";
import {Link}            from 'react-router-dom';

function LoginPage() {
    const context = useContext(PlayGroundContext);
    const {email,password,setEmail,setPassword} = context;
    // let loginQuery = `INSERT INTO users (email, encrypted_password) VALUES (${email}, ${password});`
    // let registerQuery = `INSERT INTO users (first_name, last_name, user_image, email, encrypted_password) VALUES ('test', 'user', 'testImage', 'testuser@gmail.com', '1234');`
    function handleSubmit(event) {
        event.preventDefault();
        const postURL = "http://localhost:3000/users/"
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((response)=>{
            console.log(response)
            // alert('You have been added to the system!');
        })
        // alert('A name was submitted: ' + email + password);
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
