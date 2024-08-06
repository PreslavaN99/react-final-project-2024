import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

function AuthGuard() {
    let location = useLocation();
    let token = sessionStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" state={{from: location}}/>;
    }
    return <Outlet/>;
}

export default AuthGuard;
