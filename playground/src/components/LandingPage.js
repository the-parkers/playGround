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
            <section className="showcase">
            <div id="nav">
                    <h2 className="logo">PlayGround</h2>
                    <div className="toggle" onClick={addActive}></div>
            </div>
                <video src="/assets/scene2.mp4" loop autoPlay muted></video>
                <div className="overlay"></div>
                <div className="text">
                    <h2>Lets bring</h2> 
                    <h3>communities back!</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                    <a href="/login">Explore</a>
                </div>
                <ul className="social">
                   <li>
                        <Link to="#" className="a">
                            <img src="/assets/facebook.png" alt= ""/>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="a">
                            <img src="/assets/twitter.png" alt= ""/>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="a">
                            <img src="/assets/instagram.png" alt= ""/>
                        </Link>
                    </li>
                </ul>
            </section>
            <div className="menu">
                <ul>
                    <li><Link to="/login" className="a">Login</Link></li>
                    <li><Link to="/signUp" className="a">Sign Up</Link></li>
                </ul>
            </div>
            
        </>
    )
}

export default LandingPage;