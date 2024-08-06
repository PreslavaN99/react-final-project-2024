import './navBarStyle.css';
import {NavLink} from 'react-router-dom';


const NavBar = () => {

    let user = sessionStorage.getItem('authenticatedUser');
    let yes = (
        <>
            <NavLink to={'/'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> Home <i className="fas fa-home"></i></li>
            </NavLink>
            <NavLink to={'/animal-add'}
                     className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}
                > Add animal <i className="fas fa-plus-square"></i></li>
            </NavLink>
            <NavLink to={'/account'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> Account <i className="fas fa-user-circle"></i></li>
            </NavLink>
            <NavLink to={'/find-all'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> All animals <i className="fas fa-puzzle-piece"></i></li>
            </NavLink>
            <NavLink to={'/animal-find'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> Find animal <i className="fas fa-puzzle-piece"></i></li>
            </NavLink>
            <NavLink to={`/animal-manage`} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> Manage my animals <i className="fas fa-tasks"></i></li>
            </NavLink>
            <NavLink to={'/logout'}>
                <li className={'navbar'}> Logout <i className="fas fa-door-open"></i></li>
            </NavLink>
        </>
    );

    let no = (
        <>
            <NavLink to={'/login'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}>Login <i className="fas fa-sign-in-alt"></i></li>
            </NavLink>
            <NavLink to={'/register'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}>
                    Register <i className="fas fa-arrow-circle-up"></i>
                </li>
            </NavLink>
            <NavLink to={'/'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> Home <i className="fas fa-home"></i></li>
            </NavLink>
        </>
    );

    let admin = (
        <>
            <NavLink to={'/admin'} className={({isActive}) => "" + (isActive ? "active" : "")}>
                <li className={'navbar'}> Admin panel <i className="fas fa-user-shield"></i></li>
            </NavLink>
        </>
    );

    const isAdmin = () => {
        let roles = sessionStorage.getItem('roles')
        if (roles) {
            return roles.includes('ROLE_ADMIN');
        }
        return null;
    }

    return <header className={'navbar top'}>
        <nav>
            <ul> {
                user ? yes : no
            }
                {isAdmin() ? admin : ''}
            </ul>
        </nav>
    </header>;
}

export default NavBar;