import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = ({ props }) => {
    //eslint-disable-next-line
    const login = localStorage.getItem('login');

    return login ? <Outlet /> : <Navigate to="/" />

}

export default PrivateRouter;