import './formStyle.css'
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from 'react'

import * as authenticationService from "../../api/service/AuthenticationService";
import {useAuth} from "../../api/contexts/AuthContext";
import {jwtDecode} from "jwt-decode";

const Login = ({onLogin}) => {
    const {login} = useAuth();

    let navigate = useNavigate();
    let [userInfo, setUserInfo] = useState({hasLoginFailed: false,});
    let [fieldsCheck, seTFieldsCheck] = useState({allFields: false});
    const onSubmitLogin = (e) => {

        e.preventDefault();
        let form = new FormData(e.target);
        let username = form.get('username');
        let password = form.get('password');

        if (!username || !password) {
            seTFieldsCheck({allFields: true});
            return;
        }
        seTFieldsCheck({allFields: false});

        authenticationService
            .authJwtService(username, password)
            .then((response) => {
                authenticationService.login(username, response.data.token);

                let decoded = jwtDecode(response.data.token);
                let roles = decoded['roles'];
                roles = roles.map(x => x).join(' ');

                let user = {
                    authenticatedUser: username,
                    token: response.data.token,
                    roles: roles
                }
                login(user, true)
                onLogin();
                navigate('/');
            }).catch((err) => {
            e.target.password.value = '';
            setUserInfo({hasLoginFailed: true})
        })
    }


    return (
        <div className="login-box">
            <h2>Login</h2>
            {userInfo.hasLoginFailed && <div className="warning">Invalid Credentials</div>}
            {fieldsCheck.allFields ? <div className="warning">Fill all fields!</div> : ''}
            <form onSubmit={onSubmitLogin}>
                <div className="user-box">
                    <input type="text" name="username" defaultValue=''
                    />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input type="password" name="password" defaultValue=''
                    />
                    <label>Password</label>
                </div>
                <button type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Submit
                </button>
                <Link to={'/register'}>Don't have account? Register here</Link>
            </form>
        </div>
    );
}

export default Login;