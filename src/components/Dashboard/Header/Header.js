import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DefaultContext } from '../../../context/DefaultContext/Context';

import './Header.css';
const Header = () => {
    const {dataTemp,setDataTemp,onlineStat,setOnlineStat} = useContext(DefaultContext);
    const [onlineUsers,setOnlineUsers] = useState([])

    const logOutHandle = () =>{
        setDataTemp({...dataTemp,login:{}});
        localStorage.removeItem('loginToken');

        // set online status false in API 
         fetch(`http://localhost:5001/api/user/${dataTemp.login.email}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({onlineStatus:false})
        })
        .then(res => res.json())
        .then(data => {
            console.log('dataUser',data)
            setOnlineStat(false)
        })
        .catch(error =>{
            console.log(error)
        })
    }


    useEffect(()=>{
        fetch('http://localhost:5001/api/user/online/useronline')
     .then(res => res.json())
     .then(data => {
        setOnlineUsers(data);
         
     })
     .catch(error => {
         console.log(error)
     })
     },[dataTemp.login,onlineStat]);
console.log(onlineUsers)
    return (
        <div className='topbar'>
        <h4>Client Dashboard</h4>
        <div className="onlineUserMainDiv">
            <h3>Now on Online:</h3>
            {
                onlineUsers.length > 0 ?
                onlineUsers.map(onlineUser =><div 
                key={onlineUser._id}
                title={onlineUser.name}
                className='icon-container'>
                <img src={onlineUser.img} alt='' />
                <div className='status-circle'>
                </div>
                </div>
                ) : <h2>{onlineUsers.message}</h2>
            }
        </div>
        <div className="imageDivTopbar">
        {dataTemp?.login?.loggedIn === true &&
            <img src={dataTemp?.login?.img} alt="" /> 
        }
            <p>{dataTemp?.login?.name}</p>
            <div className="loginLogout">
                <p>{dataTemp?.login?.loggedIn === true ? <Link className='loginLogoutText' onClick={logOutHandle}>LogOut</Link>:<Link className='loginLogoutText' to='/login'>Login</Link>}</p>
        </div>
        </div>
        
    </div>
    );
};

export default Header;