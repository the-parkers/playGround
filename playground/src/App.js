import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import SpecificPark from './components/SpecificPark'
import { Switch, Route } from 'react-router-dom'
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/signUp' component={SignUpPage}/>
        <>
          <Route component={Navbar}/>
          <Route exact path='/parks/:parkId' component={SpecificPark}/>
          <Route exact path='/parks' component={HomePage}/>
          <Route path='/user' component={UserPage}/>
        </>
      </Switch>
    </div>
  );
}

export default App;
