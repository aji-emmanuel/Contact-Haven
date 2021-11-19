import './App.css';
import {Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utilities/setAuthToken';
import PrivateRoute from './utilities/PrivateRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

if(localStorage.token){
    setAuthToken(localStorage.token);
};

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <div className="form-container">
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </div>
                </Switch>
             </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
