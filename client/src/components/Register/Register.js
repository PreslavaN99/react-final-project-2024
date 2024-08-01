import {Link, useNavigate} from "react-router-dom";
import '../Login/formStyle.css'
import {useState} from "react";
import * as userService from '../../api/service/UserService'
import * as AuthenticationService from "../../api/service/AuthenticationService";

const Register = ({onLogin}) => {
    let navigate = useNavigate();
    let [fieldsCheck, seTFieldsCheck] = useState(
        {notMatch: false},
        {allFields: false}
    );
    let [dbError, setDbError] = useState([]);

    const onSubmitRegister = (e) => {
        e.preventDefault();

        let form = new FormData(e.target);
        let username = form.get('username');
        let password = form.get('password');
        let repassword = form.get('repassword');
        let email = form.get('email');

        username = username.toLocaleLowerCase().trim();
        password = password.toLocaleLowerCase().trim();
        repassword = repassword.toLocaleLowerCase().trim();
        email = email.toLocaleLowerCase().trim();

        if (!password || !repassword || !username || !email) {
            seTFieldsCheck({allFields: true});
            e.target.password.value = '';
            e.target.repassword.value = '';
            return;
        }

        if (password !== repassword) {
            seTFieldsCheck({notMatch: true,});
            e.target.password.value = '';
            e.target.repassword.value = '';
            return;
        }

        seTFieldsCheck({notMatch: false, allFields: false});

        userService.onRegister({username, password, email})
            .then(res => res.json())
            .then(data => {
                if (data.code === 401) {
                    let errors = data.cause.split(', ');
                    setDbError(errors);
                    e.target.password.value = '';
                    e.target.repassword.value = '';
                    return;
                }
                setDbError([]);
                AuthenticationService
                    .authJwtService(username, password)
                    .then((response) => {
                        AuthenticationService.login(username, response.data.token);
                        onLogin();
                        navigate('/');
                    });
            }).catch(err => err);
    }

    return (
        <div className={'div-c'}>
            <div className={'flex'}>
                <div className="login-box">
                    <h2>Register</h2>
                    <form onSubmit={onSubmitRegister}>
                        <div className="user-box">
                            <input type="text" name="username" required=""/>
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="text" name="email" required=""/>
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="password" required=""/>
                            <label>Password</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="repassword" required=""/>
                            <label>Repeat password</label>
                        </div>
                        <button type="submit">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                        </button>
                        <Link to={'/login'}>Already member? Login here</Link>
                    </form>
                </div>
                <div className={'errors'}>
                    {fieldsCheck.notMatch ? <div className="warning">Passwords don't match!</div> : ''}
                    {fieldsCheck.allFields ? <div className="warning">Fill all fields!</div> : ''}
                    {dbError ? dbError.map(x =>
                        <div key={x} className="warning">{x.replaceAll(/[\\[\]]/g, '')}</div>) : ''}
                </div>
            </div>
        </div>

    );
}