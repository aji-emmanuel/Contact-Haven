import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../layout/Alert';

const Register = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = user;
    const { registerUser, error, clearError, isAuthenticated } = authContext;

    useEffect(() =>{

        if(isAuthenticated){
            props.history.push('/');
        };
        if(error === 'User already exists!'){
             alertContext.setAlert('User already exists!', 'danger');
             clearError();
        };

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = (e) =>{
        setUser({ ...user, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) =>{
        e.preventDefault();
         if(password !== password2){
            alertContext.setAlert('Password does not match', 'danger');
        } else{
            registerUser({name, email, password});
        };
    };

    return (
        <div className='container'>
            <h1>
                <span className='text-primary'>Register</span> Account
            </h1>
            <Alert />
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={name} onChange={onChange} required/>
                    </div>
                     <div>
                        <label htmlFor='name'>Email</label>
                        <input type='email' name='email' value={email} onChange={onChange} required/>
                    </div>
                     <div>
                        <label htmlFor='name'>Password</label>
                        <input type='password' name='password' value={password} onChange={onChange} minLength='6' required/>
                    </div>
                     <div>
                        <label htmlFor='name'>Confirm Password</label>
                        <input type='password' name='password2' value={password2} onChange={onChange} minLength='6' required/>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-block" type='submit' onSubmit={onSubmit}>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default Register;
