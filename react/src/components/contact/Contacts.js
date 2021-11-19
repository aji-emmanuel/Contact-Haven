import React, {Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../../utilities/Spinner';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const {contacts, filtered, loading } = contactContext;

     if(loading){
        return <Spinner />
    } else if(contacts.length === 0){
        return <h3 className='text-center'>You have no contacts. Please, add a new Contact.</h3>
    } else{
        return (
            <Fragment>
                <TransitionGroup>
                { filtered !== null ?
                    filtered.map(contact =>
                    <CSSTransition key = {contact._id} timeout={1000} classNames='item'>
                    <ContactItem  contact = {contact} />
                    </CSSTransition>)
                    :
                    contacts.map(contact =>
                    <CSSTransition key = {contact._id} timeout={1000} classNames='item'>
                    <ContactItem  contact = {contact} />
                    </CSSTransition>)
                } 
                </TransitionGroup>
            </Fragment>
    )};
}

export default Contacts;
