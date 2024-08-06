import React, {useEffect, useState} from 'react';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import {Routes, Route} from 'react-router-dom';
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import AnimalAdd from "./components/Animal/AnimalAdd/AnimalAdd";
import AnimalById from "./components/Animal/AnimalById/AnimalById";
import Account from "./components/Account/Account";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import NoData from "./components/NoData/NoData";
import AuthGuard from "./components/RouteGuards/AuthGuard";
import NoAuthGuard from "./components/RouteGuards/NoAuthGuard";
import AdminGuard from "./components/RouteGuards/AdminGuard";
import ErrorCatch from "./api/errorBound/ErrorCatch";
import {AuthProvider} from "./api/contexts/AuthContext";
import * as AuthenticationService from "./api/service/AuthenticationService";
import AllAnimals from "./components/AllAnimals/AllAnimals";
import ManageAnimal from "./components/Animal/ManageAnimal/ManageAnimal";
import Register from "./components/Register/Register";
import Animal from "./components/FindAnimal/Animal/Animal";
import AnimalFind from "./components/FindAnimal/AnimalFind";

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
                            <Route path={'/animal-add'} element={<AnimalAdd/>}/>
                            <Route path={'/animal/:id'} element={<AnimalById/>}/>
                            <Route path={`/animal-manage`} element={<ManageAnimal/>}/>
                            <Route path={`/account`} element={<Account/>}/>
                            <Route path={`/animal-find`} element={<AnimalFind/>}/>
                            <Route path={`/animal-read/:id`} element={<Animal/>}/>
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