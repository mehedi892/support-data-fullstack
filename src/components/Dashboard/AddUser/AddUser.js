import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddUser.css';

function AddUser() {
    const navigate = useNavigate();
const handleAddUser = (e) =>{
e.preventDefault();
   const name = e.target.name.value;
   const email = e.target.email.value;
   const role = e.target.role.value;
   const img = e.target.img.value;
   const password = e.target.password.value;
   const user = {name,email,role,img,password}
   console.log(user);

   //create a user in database

   fetch(`http://localhost:5001/api/user/register`,{
    method:'POST',
    headers:{
        'content-type': 'application/json'
    },
    body:JSON.stringify(user)
   })
   .then(res =>res.json())
   .then(data=>{
    if(data.newUser){
        toast.success(data.message)
        navigate('/manageuser')
    }else{
        toast.warn(data.message)
    }
   })
   .catch(error =>{
    toast.error(`Something wrong ${error}`)
   })
   
}
  return (
    <div className='login-container'>
            <h4 className='title text-center'>Add A User</h4>
            <form className="loginForm" onSubmit={handleAddUser}>
                <div className="emailPass flex-column">
                    <h4>Name</h4>
                    <input type="text" name="name" placeholder='enter full name' required/>
                    <h4>Role</h4>
                    <input type="text" name="role" placeholder='user/admin' required/>
                    <h4>Email</h4>
                    <input type="text" name="email" placeholder='enter full name' required/>
                    <h4>Image Link</h4>
                    <input type="text" name="img" placeholder='paste the image link' required/>
                    <h4>Password</h4>
                    <input type="password" name="password" placeholder='enter your pass' required/>
                </div>
                <div className="loginBtnDiv">
                <input type="submit" className='btn loginBtn' value="Add a User" />
                </div>
            </form>
        </div>
  )
}

export default AddUser