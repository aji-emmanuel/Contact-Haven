import React, {useContext, useEffect} from 'react';
import ContactForm from '../contact/ContactForm';
import Contacts from '../contact/Contacts';
import FilterContact from '../contact/FilterContact';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Home = () => {

    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {loadUser} = authContext;
    const {LoadContact} = contactContext;

    useEffect(() =>{
        loadUser();
        LoadContact();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <FilterContact />
                <Contacts />
            </div>
        </div>
    )
};

export default Home