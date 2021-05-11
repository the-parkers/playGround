import { useState} from "react"
import PlayGroundContext from "./PlayGroundContext"


function PlayGround(props) {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

  

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