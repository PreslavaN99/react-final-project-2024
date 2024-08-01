import * as AuthenticationService from "../../api/service/AuthenticationService";
import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useAuth} from "../../api/contexts/AuthContext";


const Logout = ({onLogout}) => {
    const {logout} = useAuth();
    AuthenticationService.logout();

    useEffect(() => {
        logout();
        onLogout();
    }, [onLogout, logout])

    return <Navigate to="/" replace={true}/>;
}

export default Logout;