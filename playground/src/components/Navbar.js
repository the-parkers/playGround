import { useEffect,useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Image, Menu, Segment } from 'semantic-ui-react'

function Navbar(){
  const [userProfile,setUserProfile] = useState({})
  let history = useHistory()
  useEffect(()=> {
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
        delete data.User.first_name
        delete data.User.last_name
        delete data.User.email
        console.log(data)
          const content = Buffer.from(data.User.user_image.data)
          const string64 = content.toString('base64')
          setUserProfile((prev) => ({...prev,id:data.User.id, user_image: `data:image/png;base64,${string64}`}))
      }
    })
    }else {
      history.push('/')
    }
  },[history])
  const [nav,setNav] = useState('home')
  const handleItemClick = (e, { name }) => setNav({ activeItem: name })
    return (
      <>
        {/* <nav id="navbar">
          <Link to={"/parks"}>
              <h3 id="homeIcon">Home</h3>
              </Link>
              <Link to={`/users/${userProfile.id}`}>
              <Image src={userProfile.user_image} size='mini' alt={"oh no"} circular/>
          </Link>
        </nav> */}
        <Segment size='tiny' inverted>
        <Menu size='big' inverted pointing secondary>
        <Link to={"/parks"}>
          <Menu.Item
            name='home'
            active={setNav === 'home'}
            onClick={handleItemClick}
          />
          </Link>
          <Menu.Menu position='right'>
            <Link to={`/users/${userProfile.id}`}>
          <Menu.Item>
          <Menu.Item
            onClick={handleItemClick}
            />
          <Image src={userProfile.user_image} size='mini' alt={"oh no"} circular/>
          </Menu.Item>
            </Link>
        </Menu.Menu>
        </Menu>
      </Segment>
      </>
    )
}

export default Navbar