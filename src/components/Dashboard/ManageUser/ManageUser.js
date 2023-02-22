import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import delete_icon from '../../../imageIcon/delete_icon.svg';
import update_icon from '../../../imageIcon/update_icon.svg';

import './ManageUser.css';

function ManageUser() {
    const navigate = useNavigate();
    const [users,setUsers] = useGetAllUsers();

    const handleUpdateUser = (email) =>{
        navigate(`/updateuser/${email}`);
        
    }

    const handleDeleteUser = (id) =>{
        //delete user api call

        if(window.confirm('Are you sure? Want to Delete the user !!!')){
        fetch(`http://localhost:5001/api/user/${id}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.length > 0){
                toast.success('User Deleted Successfully')
                setUsers(data)
            }else{
                toast.warn('User is Not Deleted !!!!')
            }
            
        })
        .catch(error =>{
            toast.error('Something wrong')
        })
    }else{
        toast.warn('You have selected "NO"')
    }
    }
  return (
    <div className='tableParent'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>update/delete</th>
                        </tr>
                    </thead>
                    <tbody>
                   {
                    users.map(user => <tr key = {user._id}>
                        <td>{users.indexOf(user) + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className='upDelIcon'>
                        <div title='Update User' onClick={()=>handleUpdateUser(user.email)}>
                            <img className='icon' src={update_icon} alt='update' />
                            </div>
                            
                        <div title='Delete User'  onClick={()=>handleDeleteUser(user._id)}>
                        <img className='icon' src={delete_icon} alt='update' />
                        </div>
                        </td>
                    </tr>)
                   }
                    </tbody>
                </table>
            </div>
  )
}

export default ManageUser