import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import SpecificPark from './components/SpecificPark'

import { Switch, Route } from 'react-router-dom'
import UserPage from './components/UserPage';

import Favorites from "./components/Favorites";
import Events from "./components/Events"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/signUp' component={SignUpPage}/>
        <>
          <Route component={Navbar}/>
          <Route path='/parks/:parkId' component={SpecificPark}/>
          <Route exact path='/parks' component={HomePage}/>
          <Route path='/user' component={UserPage}/>
          <Route path={["/favorites"]} component={Favorites} />
          <Route path="/events" component={Events} />
        </>
      </Switch>
    </div>
  );
}

export default App;
