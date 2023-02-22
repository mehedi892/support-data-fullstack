import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateUser() {
    const [existUser,setExistUser] = useState({});
    const {email} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:5001/api/user/${email}`)
        .then(res => res.json())
        .then(data =>{
            setExistUser(data)
        })
        .catch(error =>{
            console.log(error)
        })
    },[email]);

    const handleUpdateAUser = (e) =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const role = e.target.role.value;
        const img = e.target.img.value;
        const user = {name,email,role,img}

        //update a user api


         fetch(`http://localhost:5001/api/user/${existUser._id}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                toast.success('User Updated Successfully');
                navigate('/manageuser')
            }else{
                toast.warn('User is not Updated')
            }
            
        })
        .catch(error =>{
            toast.error(`Something wrong ${error}`)
        })
    }
  return (
    <div className='login-container'>
    <h4 className='title text-center'>Updating  {existUser?.name}</h4>
    <form className="loginForm" onSubmit={handleUpdateAUser}>
        <div className="emailPass flex-column">
            <h4>Name</h4>
            <input type="text" defaultValue={existUser?.name} name="name" placeholder='enter full name' required/>
            <h4>Role</h4>
            <input type="text" defaultValue={existUser?.role} name="role" placeholder='user/admin' required/>
            <h4>Email</h4>
            <input type="text" defaultValue={existUser?.email} name="email" placeholder='enter full name' required/>
            <h4>Image Link</h4>
            <input type="text" name="img" defaultValue={existUser?.img} placeholder='paste the image link' required/>
        </div>
        <div className="loginBtnDiv">
        <input type="submit" className='btn loginBtn' value="Update" />
        </div>
    </form>
</div>
  )
}

export default UpdateUser