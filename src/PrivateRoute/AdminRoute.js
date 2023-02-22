import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DefaultContext } from '../context/DefaultContext/Context';

function AdminRoute({children}) {
    const {dataTemp} = useContext(DefaultContext);
    if (dataTemp?.login?.role !== 'admin') {
        return <Navigate to="/login" />
    }
  return children
}

export default AdminRoute