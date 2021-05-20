import { useState,useEffect } from 'react'
import UserInput  from "./UserInput"
import {Button, Modal, Form} from 'react-bootstrap'
import { useHistory } from 'react-router';

function EditProfileModal(){
    const [validated, setValidated] = useState(false);
    let history = useHistory()
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    useEffect(() => {
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
              const {first_name,last_name,email} = data.User
              setFirstName(first_name)
              setLastName(last_name)
              setEmail(email)
          }
        })
        }else {
          history.push('/')
        }
    }, [history])
    function signOut() {
        localStorage.removeItem("user")
        history.push('/')
    }
    const updateProfile = (e) => {
        const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      let user = JSON.parse(localStorage.getItem('user'))
      user = user.User
      const formData = {
        firstName,
        lastName,
        email,
        password,
        user
     }
     e.preventDefault();
       setValidated(true);
if(email !== '' && firstName !== '' && lastName !== '' && password !== '') {
     const option = {
         mode:'cors',
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
           },
         body: JSON.stringify(formData)
     }
     fetch("http://localhost:5000/updateProfile", option)
     .then(response => response.json())
     .then(data => { 
         if(data.Auth) {
             if(data.Duplicate){
                setEmail('')
                setValidated(true);
             }else {
                setModalShow(!modalShow)
                localStorage.removeItem("user")
                 history.push('/')
             }
         }else {
             setPassword('')
             setValidated(true);
         }
     })
    }
         
    }
    return (
        <div>
        <Button className="editProfile" onClick={() => setModalShow(!modalShow)}>Edit Profile</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>Edit Profile</Modal.Header>
         
         <Form noValidate validated={validated} onSubmit={updateProfile}>
            <Modal.Body>
            <UserInput type="text" value={firstName} setValue={setFirstName} label="First Name" required message="We all have a name yours is empty"/>
            <hr/>
            <UserInput type="text" value={lastName} setValue={setLastName}  label="Last Name" message="Buddy your name can't be empty"/>
            <hr/>
            <UserInput type="email" value={email} setValue={setEmail}  label="Email" message="Hi Clone that email is taken, Survival of the quickest out here"/>
            <hr/>
            <UserInput type="password" value={password} setValue={setPassword} label="Verify Password" message="Invalid Credential"/>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={signOut}>Sign Out</Button>
                <Button type={"submit"} >Update Profile</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </div>
    )
}

export default EditProfileModal