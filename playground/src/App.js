import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import LandingPage from './components/LandingPage'

import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import SpecificPark from './components/SpecificPark'
import { Switch, Route } from 'react-router-dom'
import UserPage from './components/UserPage';


// import Favorites from "./components/Favorites";
// import Events from "./components/Events"
// import { useContext } from "react"
// import PlayGroundContext from "./context/PlayGroundContext"


function App() {


  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/login' component={LoginPage}/>
        <Route path='/signUp' component={SignUpPage}/>
        <>
          <Route component={Navbar}/>
          <Route exact path='/parks/:parkId' component={SpecificPark}/>
          <Route exact path='/parks' component={HomePage}/>
          <Route path='/users/:id'  component={UserPage}/>
        </>
      </Switch>
    </div>
  );
}

export default App;
