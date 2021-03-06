import React, {useReducer } from 'react'
import { v4 as uuid} from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { REMOVE_ALERT, SET_ALERT } from '../types';

const AlertState = (props) => {

    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (message, type, timeOut = 5000) =>{
        const id = uuid();
        dispatch({type: SET_ALERT, payload: {id, message, type}});
        setTimeout(() => dispatch({type:REMOVE_ALERT, payload: id}), timeOut)
    }

    return (
        <AlertContext.Provider value={{
            alerts: state,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;
