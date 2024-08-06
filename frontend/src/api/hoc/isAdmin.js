import {Navigate} from 'react-router-dom';

export const isAdmin = (Component) => {

    return () => {
        let roles = sessionStorage.getItem('roles');
        let admin;
        if (roles) {
            admin = Boolean(roles.includes('ROLE_ADMIN'))
        }
        return admin
            ? <Component/>
            : <Navigate to="/"/>
    };
};
