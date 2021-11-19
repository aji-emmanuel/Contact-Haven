import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';
import Alert from '../layout/Alert';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const {AddContact, UpdateContact, ClearCurrent, current} = contactContext;
    const { error, ClearError } = contactContext;

    const [contact, setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal'
    });
    
    useEffect(()=>{
        if(current!==null){
            setContact(current);
        } else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            });
            if(error !== null){
                alertContext.setAlert('Invalid email address!' , 'danger');
                ClearError();
            };
        }
    }, [contactContext, alertContext, ClearError, current, error]);

    const {name, email, phone, type} = contact;
    

    const onChange = (e) =>{
        setContact({...contact, [e.target.name]:e.target.value});
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        if(current===null){
            AddContact(contact);
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal'
            });
        } else{
            UpdateContact(contact);
            if(error===null){
                ClearCurrent();
            };
        };
    };

    const clearAll = () =>{
        ClearCurrent();
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <h2 className='text-primary'>
                    {current === null ? 'New Contact' : 'Edit Contact'}
                </h2>
                <input type='text' 
                            name='name' value={name} 
                            placeholder='Name' 
                            onChange={onChange} required/>
                <input type='email' 
                            name='email' value={email} 
                            placeholder='Email' 
                            onChange={onChange}/>
                <input type='text' 
                            name='phone' value={phone} 
                            placeholder='Phone' 
                            onChange={onChange} minLength='10' required/>
                <h5>Contact Type</h5>
                <input type="radio" 
                            name="type" value='personal' 
                            checked={type === 'personal'}  
                            onChange={onChange}/> Personal {' '}
                <input type="radio" 
                            name="type" value='professional' 
                            checked={type === 'professional'} 
                            onChange={onChange}/> Professional
            <div>
                    <button type="submit" className="btn btn-primary btn-block">
                        {current === null ? 'Add Contact' : 'Save Changes'}
                    </button>
            </div>
            <div>
                {current &&<button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>}
            </div>
            </form>
            <Alert />
        </>
    )
};

export default ContactForm;