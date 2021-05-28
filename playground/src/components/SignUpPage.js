import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext, useState} from 'react'
import { Form, Card } from 'react-bootstrap'
import {Link,useHistory} from 'react-router-dom'
import { Button } from 'semantic-ui-react'

function SignUpPage() {
    const [validated, setValidated] = useState(false);
    let history = useHistory();
     const context = useContext(PlayGroundContext)
     const [file,setFile] = useState([])
     const {email,firstName,lastName,password,setEmail,setFirstName,setLastName,setPassword} = context
     const handleFileUpload = (e) => {
        let {files} = e.target
        if(files[0]){
          e.target.labels[0].innerText = files[0].name
        }
        files = files[0]
        setFile(files)
    }
     function handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        e.preventDefault()
        const formData = {
           email,
           password,
           firstName,
           lastName
        }
        setValidated(true);
     if(email !== '' && firstName !== '' && lastName !== '' && password !== '') {
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
            setEmail('')
            setValidated(true);
          }else{
            setValidated(true);
            localStorage.setItem("user",  JSON.stringify({Token:data.Token,User:data.User}))
            history.push('/parks')
          }
      })
    }
}
    return (
        <div className="welcomeImage">
            <div className="signUpPage">
              <Card id="signUpCard" style={{ width: '25rem', borderRadius:'20px', padding:'10px' }}>
              <h1>What are you waiting for? The parks are waiting!</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <UserInput type="text" value={firstName} setValue={setFirstName} id="FirstName" label="First name" message="FirstName is required"/>
                    <UserInput type="text" value={lastName} setValue={setLastName} id="LastName" label="Last name" message="LastName is required"/>
                    <UserInput type="email" value={email} setValue={setEmail} id="Email" label="Email" message="Duplicate Email. Your clone was here before you"/>
                    <UserInput type="password" value={password} setValue={setPassword} id="Password" label="Password" message="Password Needed"/>
                    <Form.File 
                        id="file-input"
                        name="profileImage"
                        label="Upload Profile Image"
                        onChange={handleFileUpload}
                        accept="image/*"
                        custom
                    />
                    <br/>
                    <Button primary className="loginSignUpButtonPage">Sign Up</Button>
                </Form>
                <br/>
                <span>Already have an Account?<Link to={'/login'}> Login 
                </Link>
                </span>
               </Card>  
               <div className="overlay2"></div>
            </div>
        </div> 
    )
}

export default SignUpPage