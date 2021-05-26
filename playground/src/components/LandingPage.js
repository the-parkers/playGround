// import Navbar from './Navbar'
import { Navbar } from 'react-bootstrap';
import {Link, Route} from 'react-router-dom';




function LandingPage() {
    
    function addActive(e) {
        const showcase = document.querySelector('.showcase');
        if(showcase.className === 'showcase active') {
            showcase.className = 'showcase';
        } else {
            showcase.className = 'showcase active';
        }
        return (e.target.className === 'toggle active')? 
            e.target.className = 'toggle'
          : e.target.className = 'toggle active'
    }

    return (
        <>
            <Navbar className="nav">

                    <h2 className="logo">PlayGround</h2>
                    <div className="toggle" onClick={addActive}></div>

            </Navbar>
            <section className="showcase">
                <video src="/assets/scene2.mp4" loop autoPlay muted></video>
                <div className="overlay"></div>
                <div className="text">
                    <h2>Lets bring</h2> 
                    <h3>communities back!</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                </div>
                <div className="social">
                    <Link to="#">
                        {/* <img src="https://i.ibb.co/x7P24fL/facebook.png"> */}
                        <h1>menu item</h1>
                    </Link>
                </div>
            </section>
            <div className="menu">
                <Link to="/login">
                    {/* <img src="https://i.ibb.co/x7P24fL/facebook.png"> */}
                    <h1>Login</h1>
                </Link>
        
                {/* <Link to="/signUp">
                    <h1>Sign Up</h1>
                </Link> */}
            </div>
            
        </>
    )
}

export default LandingPage;