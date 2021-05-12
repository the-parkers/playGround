import './App.css';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/signUp' component={SignUpPage}/>
      </Switch>
    </div>
  );
}

export default App;
