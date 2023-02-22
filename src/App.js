
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Addclient from './components/Dashboard/Addclient/Addclient';
import AddUser from './components/Dashboard/AddUser/AddUser';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Dashboard/Header/Header';
import Login from './components/Dashboard/Login/Login';
import ManageUser from './components/Dashboard/ManageUser/ManageUser';
import Sidebar from './components/Dashboard/Sidebar/Sidebar';
import Updateclient from './components/Dashboard/Updateclient/Updateclient';
import UpdateUser from './components/Dashboard/UpdateUser/UpdateUser';
import Summary from './components/Summary/Summary';
import AdminRoute from './PrivateRoute/AdminRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {

  
  return (
    
    <div>
       
      <Header></Header>
      <div  className='main-container'>
      <Sidebar></Sidebar>
      

      <Routes>
        <Route path='/' element={
          <PrivateRoute>
 <Dashboard></Dashboard>
          </PrivateRoute>
       
        }></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/addclient' element={
          <PrivateRoute>
           <Addclient></Addclient>
          </PrivateRoute>
        }></Route>
        
        <Route path='/upadteclient/:store' element={<Updateclient></Updateclient>}></Route>
       
        <Route path='/summary' element={
          <PrivateRoute>
          <Summary></Summary>
         </PrivateRoute>
        }></Route>
        <Route path='/adduser' element={
          <AdminRoute>
          <AddUser></AddUser>
         </AdminRoute>
        }></Route>

<Route path='/manageuser' element={
          <AdminRoute>
          <ManageUser></ManageUser>
         </AdminRoute>
        }></Route>


<Route path='/updateuser/:email' element={
          <AdminRoute>
         <UpdateUser></UpdateUser>
         </AdminRoute>
        }></Route>


      </Routes>
      </div>
      <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
    </div>
    
  );
}

export default App;
