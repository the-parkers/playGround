import { useState } from 'react'

import {Button, Modal} from 'react-bootstrap'

function EditProfileModal(){
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    return (
        <div>
        <Button className="editProfile" onClick={() => setModalShow(!modalShow)}>Edit Profile</Button>
        <Modal show={modalShow} onHide={()=>{setModalShow(!modalShow)}}>
            <Modal.Header closeButton>Edit Profile</Modal.Header>
            <form>
            <Modal.Body>
                <h4 for="firstName">First Name</h4>
                <input type="text" name="firstName" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} required/>
                <h4 for="lastName">Last Name</h4>
                <input type="text" name="lastName" value={lastName} onChange={(e) => {setLastName(e.target.value)}} required/>
                <h4 for="email">Last Name</h4>
                <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
            </Modal.Body>
                <Modal.Footer>
                    <span>All Done?</span>
                <Button type={"submit"}>Update Profile</Button>
                </Modal.Footer>
            </form>
        </Modal>
    </div>
    )
}

export default EditProfileModal