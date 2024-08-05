import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";

function AdminGuard() {
    let location = useLocation();
    let roles = sessionStorage.getItem('roles');

    if (roles) {
        if (!roles.includes('ROLE_ADMIN')) {
            return <Navigate to="/" state={{from: location}}/>;
        }
    } else {
        return <Navigate to="/" state={{from: location}}/>;
    }
    return <Outlet/>;
}

export default AdminGuard;