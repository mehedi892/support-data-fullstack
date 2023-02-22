import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DefaultContext } from '../context/DefaultContext/Context';

function PrivateRoute({children}) {
    const {dataTemp} = useContext(DefaultContext);
    if (!dataTemp.login.loggedIn) {
        return <Navigate to="/login" />
    }
  return children
}

export default PrivateRoute