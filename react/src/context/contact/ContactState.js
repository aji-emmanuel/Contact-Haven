import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT,
    LOAD_CONTACTS,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    CONTACT_ERROR,
    CLEAR_CONTACT,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_ERRORS
} from '../types.js';


const ContactState = (props) => {

    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const AddContact = async (formData) =>{

         const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post('api/contacts', formData, config);
             dispatch({type: ADD_CONTACT, payload: response.data});
            
        } catch (error) {
             dispatch({ type: CONTACT_ERROR, payload: error.response.data.error});
        };
    };

    // Load Contacts
    const LoadContact = async () =>{

        try {
            const response = await axios.get('api/contacts');
            dispatch({ type: LOAD_CONTACTS, payload: response.data });
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.error});
        }
    };

    // Update Contact
    const UpdateContact = async (contact) =>{
         const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.put(`api/contacts/${contact._id}`, contact, config);
             dispatch({type: UPDATE_CONTACT, payload: response.data});
        } catch (error) {
             dispatch({ type: CONTACT_ERROR, payload: error.response.data.error});
        };
    };

    // Delete Contact
    const DeleteContact = async (_id) =>{
         try {
            await axios.delete(`api/contacts/${_id}`);
            dispatch({type: DELETE_CONTACT, payload: _id});
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.error});
        }
    };

    // Filter Contact
     const FilterContacts = (text) =>{
        dispatch({type: FILTER_CONTACTS, payload: text});
    }

    // Clear Filtered Contact
     const ClearFilter = () =>{
        dispatch({type: CLEAR_FILTER});
    }

    // Set Current contact
    const SetCurrent = (contact) =>{
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // Clear Current contact
    const ClearCurrent = () =>{
        dispatch({type: CLEAR_CURRENT});
    }

    // Clear Contacts
    const ClearContact = () =>{
        dispatch({type: CLEAR_CONTACT});
    };

    // Clear Error
    const ClearError = () =>{
        dispatch({type: CLEAR_ERRORS})
    };

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            loading: state.loading,
            error: state.error,
            AddContact,
            LoadContact,
            UpdateContact,
            DeleteContact,
            FilterContacts,
            ClearContact,
            ClearFilter,
            SetCurrent,
            ClearCurrent,
            ClearError
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
