import {Link} from 'react-router-dom'

function Navbar(){
    return (
      <>
        <nav id={"navbar"}>
          <Link to={"/home"}>
          <h3>Home</h3>
          </Link>
          <Link to={"/user"}>
          <img src={"https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png"} alt={"Oh no"} style={{height:"35px"}}></img>
          </Link>
        </nav>
      </>
    )
}

export default Navbar