import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import {Routes, Route} from 'react-router-dom';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import AnimalAdd from "./components/Animal/AnimalAdd/AnimalAdd";
import ManageAnimal from "./components/Animal/ManageAnimal/ManageAnimal";
import AnimalById from "./components/Animal/AnimalById/AnimalById";
import Account from "./components/Account/Account";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AnimalFind from "./components/AnimalFind/AnimalFind";
import Animal from "./components/AnimalFind/Animal/Animal";
import NoData from "./components/NoData/NoData";
import AuthGuard from "./components/RouteGuards/AuthGuard";
import NoAuthGuard from "./components/RouteGuards/NoAuthGuard";
import AdminGuard from "./components/RouteGuards/AdminGuard";
import ErrorCatch from "./api/errorBound/ErrorCatch";
import {AuthProvider} from "./api/contexts/AuthContext";
import * as AuthenticationService from "./api/service/AuthenticationService";
import AllAnimals from "./components/AllAnimals/AllAnimals";

function App() {

    const [userInfo, setUserInfo] = useState({isAuthenticated: false});

    useEffect(() => {
        let user = AuthenticationService.getLoggedInUserName();
        setUserInfo({
            isAuthenticated: Boolean(user),
            user,
        })
    }, []);

    const onLogin = (username) => {
        setUserInfo({
            isAuthenticated: true,
            user: username,
        })
    }

    const onLogout = () => {
        setUserInfo({
            isAuthenticated: false,
            user: null,
        })
    };


    return (
        <ErrorCatch>
            <AuthProvider>
                <div>
                    <NavBar {...userInfo} />
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>

                        <Route element={<NoAuthGuard/>}>
                            <Route path={'/login'} element={<Login onLogin={onLogin}/>}/>
                            <Route path={'/register'} element={<Register onLogin={onLogin}/>}/>
                        </Route>

                        <Route element={<AuthGuard/>}>
                            <Route path={'/logout'} element={<Logout onLogout={onLogout}/>}/>
                            <Route path={'/Animal-add'} element={<AnimalAdd/>}/>
                            <Route path={'/Animal/:id'} element={<AnimalById/>}/>
                            <Route path={`/Animal-manage`} element={<ManageAnimal/>}/>
                            <Route path={`/account`} element={<Account/>}/>
                            <Route path={`/Animal-find`} element={<AnimalFind/>}/>
                            <Route path={`/Animal-read/:id`} element={<Animal/>}/>
                            <Route path={`/find-all`} element={<AllAnimals/>}/>
                        </Route>

                        <Route element={<AdminGuard/>}>
                            <Route path={`/admin`} element={<AdminPanel/>}/>
                        </Route>

                        <Route path={`/*`} element={<NoData/>}/>

                    </Routes>
                    <Footer/>
                </div>
            </AuthProvider>
        </ErrorCatch>
    );
}

export default App;