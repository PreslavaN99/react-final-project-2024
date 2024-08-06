import './adminPanelStyle.css'
import {useState} from "react";
import {
    getAllUsersBySimilarUsername
} from "../../api/service/UserService";
import {isAdmin} from "../../api/hoc/isAdmin";
import AddAdminRole from "./PartsAdminPanel/AddAdminRole";
import RemoveAdminRole from "./PartsAdminPanel/RemoveAdminRole";
import DeleteUser from "./PartsAdminPanel/DeleteUser";

const AdminPanel = () => {

    let [users, setUsers] = useState([]);
    let [error, setError] = useState([]);

    function fetchUsers(e) {
        let username = e.currentTarget.value;
        if (username.length > 2 || username) {
            getAllUsersBySimilarUsername(username)
                .then(res => res.json())
                .then(data => {
                    setUsers(data)
                }).catch(err => err);
        } else {
            setUsers([])
        }
    }

    return (
        <>
            <h1>Manage very important things</h1>
            {error ? <p className={'error-admin'}>{error}</p> : ''}
            <div className={'wrap-role-manage'}>
                <AddAdminRole fetchUsers={fetchUsers} setError={setError}/>
                <DeleteUser fetchUsers={fetchUsers} setError={setError}/>
                <RemoveAdminRole fetchUsers={fetchUsers} setError={setError}/>
            </div>
            {
                users.length >= 1 ?
                    <div>
                        <p className={'p-fetch-usernames'}>Usernames from database</p>
                        <ul className={'ul-usernames'}>{users.map(x =>
                            < li key={x} className={'li-usernames'}>{x}</li>)}</ul>
                    </div>
                    : ''
            }
        </>
    );
}

export default isAdmin(AdminPanel);