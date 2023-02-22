import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DefaultContext } from '../../../context/DefaultContext/Context';
import './Sidebar.css';

const Sidebar = () => {
    const {dataTemp} = useContext(DefaultContext);
    return (
        <div className='sidebar'>
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/addclient'>Add Client</Link>
                <Link to='/summary'>Summary</Link>

                {
                    !dataTemp.login.loggedIn &&
                    <Link to='/login'>Login</Link>
                }
               
                

                {
                dataTemp.login.role === 'admin' &&
                <Link to='/adduser'>Add User</Link>
                }
                {
                dataTemp.login.role === 'admin' &&
                <Link to='/manageuser'>Manage User</Link>
                }
                
                
                
                
            </nav>
        </div>
    );
};

export default Sidebar;