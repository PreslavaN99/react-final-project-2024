import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

function NoAuthGuard() {
    let location = useLocation();
    let token = sessionStorage.getItem('token');
    if (token) {
        return <Navigate to="/" state={{from: location}}/>;
    }
    return <Outlet/>;
}

export default NoAuthGuard;