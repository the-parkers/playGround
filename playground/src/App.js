import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

import HomePage from './components/HomePage'
import Navbar from './components/Navbar'

import { Switch, Route } from 'react-router-dom'
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/signUp' component={SignUpPage}/>
        <div>
          <Route component={Navbar}/>
          <Route path='/home' component={HomePage}/>
          <Route path='/user' component={UserPage}/>
        </div>
      </Switch>
    </div>
  );
}

export default App;
