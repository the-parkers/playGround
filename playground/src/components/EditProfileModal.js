import { useState } from 'react'

import {Button, Modal} from 'react-bootstrap'
import { useHistory } from 'react-router';

function EditProfileModal(){
    let history = useHistory()
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    function signOut() {
        localStorage.removeItem("user")
        history.push('/')
    }
    return (
        <div>
        <Button className="editProfile" onClick={() => setModalShow(!modalShow)}>Edit Profile</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>Edit Profile</Modal.Header>
            <form>
            <Modal.Body>
                <h4 htmlFor="firstName">First Name</h4>
                <input type="text" name="firstName" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} required/>
                <h4 htmlFor="lastName">Last Name</h4>
                <input type="text" name="lastName" value={lastName} onChange={(e) => {setLastName(e.target.value)}} required/>
                <h4 htmlFor="email">Email</h4>
                <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={signOut}>Sign Out</Button>
                <Button type={"submit"}>Update Profile</Button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>
    )
}

export default EditProfileModal