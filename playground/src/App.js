import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route component={Navbar}/>
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/signUp' component={SignUpPage}/>
        <Route path='/home' component={HomePage}/>
      </Switch>
    </div>
  );
}

export default App;
