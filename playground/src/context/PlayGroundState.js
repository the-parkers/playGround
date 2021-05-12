import { useState, useEffect} from "react"
import PlayGroundContext from "./PlayGroundContext"

function PlayGround(props) {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
 
    // useEffect(() => {
    //     fetch('http://localhost:5000')
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // },[])

   const value = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword
   }
    return(
        <PlayGroundContext.Provider value={value}>
          {props.children}
        </PlayGroundContext.Provider>
      )
}

export default PlayGround