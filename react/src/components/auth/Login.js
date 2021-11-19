import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../layout/Alert';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;
    const { loginUser, error, isAuthenticated, clearError } = authContext;

    useEffect(() =>{
        
        if(isAuthenticated){
            props.history.push('/');
        };
        // eslint-disable-next-line
    }, [ isAuthenticated, props.history]);

    const onChange = (e) =>{
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        if(password.length<6){
            alertContext.setAlert('Password is invalid', 'danger');
            clearError();
        } else if(error === 'Invalid Email or Password'){
            alertContext.setAlert('Invalid Email or Password!', 'danger');
            clearError();
        } else if(error === 'Internal Server Error'){
            alertContext.setAlert('Oops... Something wrong with your network!', 'danger');
            clearError();
        }
        else{
            loginUser({email, password});
        }
    };

    return (
        <div className='container'>
            <h1>
                <span className='text-primary'>Login</span> Account
            </h1>
            <Alert />
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    
                     <div>
                        <label htmlFor='name'>Email</label>
                        <input type='email' name='email' value={email} onChange={onChange} required />
                    </div>
                     <div>
                        <label htmlFor='name'>Password</label>
                        <input type='password' name='password' value={password} onChange={onChange} required />
                    </div>
                    <div>
                        <button className="btn btn-primary btn-block" type='submit' onSubmit={onSubmit}>Login</button>
                    </div>
                </div>
            </form>
        </div>
       
    )
}

export default Login;
