import React, {useReducer} from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import setAuthToken from '../../utilities/setAuthToken';
import axios from 'axios';
import {
 REGISTER_SUCCESS,
 REGISTER_FAIL,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT,
 CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Register User
    const registerUser = async (formData) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('api/users', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: response.data});
            loadUser();
        } catch (error) {
             dispatch({ type: REGISTER_FAIL, payload: error.response.data.error});
        }
    };

    // Login User
    const loginUser = async (formData) =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('api/auth', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data});
        } catch (error) {
             dispatch({ type: LOGIN_FAIL, payload: error.response.data.error});
        }
    };

    // Load User
    const loadUser = async () =>{
        if(localStorage.token){
            setAuthToken(localStorage.token);
        };
        try {
            const response = await axios.get('api/auth');
            dispatch({ type: USER_LOADED, payload: response.data.loggedUser });
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload: error.response.data.error});
        }
    };

    // Logout User
    const logoutUser = () =>{
        dispatch({type: LOGOUT});
    };

    // Clear Errors
    const clearError = () =>{
        dispatch({type: CLEAR_ERRORS});
    };

    return (
        <AuthContext.Provider value ={{
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            registerUser,
            loginUser,
            loadUser,
            logoutUser,
            clearError
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export  default AuthState