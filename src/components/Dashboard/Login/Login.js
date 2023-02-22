import jwt_decode from "jwt-decode";
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultContext } from "../../../context/DefaultContext/Context";
import './Login.css';
const Login = () => {

const navigate = useNavigate();
    const [showDiv,setShowDiv] =useState(true);
    const [logErrorMsg,setLogErrorMsg] = useState('');
    //get user email and pass
    const {dataTemp,setDataTemp} = useContext(DefaultContext);
    const handleLoginSubmit = e =>{
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const userObj = {email,password};

        //login api 

        fetch('http://localhost:3001/api/user/login',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(data => {
            //navigate('/')
            console.log(data);
           if(data.token){
            setDataTemp({...dataTemp,login:jwt_decode(data.token)});
            toast.success('Login Success')
            localStorage.setItem('loginToken',data.token)
            navigate('/');
        }
        else{
            setLogErrorMsg(data.message);
            toast.error(data.message)
        }
        })
        .catch(error =>{
            toast.error('Something wrong')
        })


        // update online status true

        fetch(`http://localhost:3001/api/user/${email}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({onlineStatus:true})
        })
        .then(res => res.json())
        .then(data => {
            console.log('dataUser',data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
   
    
        
    const handleResetPassword = (e) =>{
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const userObj = {password};

        fetch(`http://localhost:3001/api/user/${email}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data.acknowledged)
           if(data.acknowledged === true){
            setShowDiv(true)
        }
        else{
            setLogErrorMsg(data.message);
        }
        })
        .catch(error =>{
            console.log(error);
        })   

        console.log(userObj)
    }
        console.log(dataTemp);
    //console.log(userLogToken);
    return (
        <div className='login-container'>
            <h4 className='title text-center'>{showDiv ? 'Login Here' : 'Reset Password'}</h4>
            <form className="loginForm" onSubmit={handleLoginSubmit} style={{display: showDiv ? 'block' : 'none' }}>
                <div className="emailPass flex-column">
                    <h4>Email</h4>
                    <input type="text" name="email" placeholder='enter your email' required/>
                    <h4>Password</h4>
                    <input type="password" name="password" placeholder='enter your pass' required/>
                </div>
               { logErrorMsg !== ''? <p className="errorMsg">{logErrorMsg} <Link onClick={()=>setShowDiv(false)}>Forget Pass !?! Reset Here</Link></p>:'' }
               
                <div className="loginBtnDiv">
                <input type="submit" className='btn loginBtn' value="Login" />
                </div>
            </form>



            <form className="loginForm" onSubmit={handleResetPassword} style={{display: showDiv ? 'none' : 'block' }}>
                <div className="emailPass flex-column">
                    <h4>Email</h4>
                    <input type="text" name="email" placeholder='enter your email' required/>
                    <h4>New Password</h4>
                    <input type="password" name="password" placeholder='enter your pass' required/>
                </div>
               <Link onClick={()=>setShowDiv(true)}>Remember Pass!! Login here</Link>
               
                <div className="loginBtnDiv">
                <input type="submit" className='btn loginBtn' value="Reset Password" />
                </div>
            </form>
        </div>
    );
};

export default Login;