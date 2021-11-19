import React, {useRef, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const FilterContact = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const {filtered, FilterContacts, ClearFilter} = contactContext;

    useEffect(()=>{
        if(filtered === null){
            text.current.value = '';
        }
    });

    const searchContacts = (e) =>{
        if(text.current.value !== ''){
            FilterContacts(e.target.value);
        } else{
            ClearFilter();
        }
    };
    
    return (
        <div>
            <input type='text' ref={text}  placeholder='Search Contacts...' onChange={searchContacts} />
        </div>
    )
}

export default FilterContact;
