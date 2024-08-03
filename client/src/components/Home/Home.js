import './homeStyle.css'
import {useEffect, useState} from "react";
import {getLastTreeAnimals} from "../../api/service/JokeService";
import {Link} from "react-router-dom";
import * as AuthenticationService from "../../api/service/AuthenticationService";
import ResetScroll from "../../api/ResetScroll/ResetScroll";

const Home = () => {
    ResetScroll();
    let isLogin = AuthenticationService.isUserLoggedIn();
    let [lastTreeAnimals, setLastTreeAnimals] = useState([]);

    useEffect(() => {
        getLastTreeAnimals()
            .then(res => res.json())
            .then(data => {

                setLastTreeAnimals(data)
            }).catch(err => err);
    }, []);

    return (
        <div>
            <h1>Adopt Animal</h1>
            {isLogin ? <p className={'welcome'}>Welcome, {AuthenticationService.getLoggedInUserName()}!</p> : ''}
            <section className={'main'}>
                <HomeCardCreate/>
                <HomeCardRead/>
                <HomeCardShare/>
            </section>
            <section className={'three'}>
                <h2 className={'h2-three'}><i className="fas fa-long-arrow-alt-down"></i> Here can see last three added
                    animals <i className="fas fa-long-arrow-alt-down"></i></h2>
                {!isLogin ? <h2 className={'h2-three'}>For more content <Link className={'home-login'}
                                                                              to={'/login'}>login.</Link>
                    </h2>
                    : ''}

                {lastTreeAnimals.map(x => <LastTreeAnimals key={x.id} joke={x}/>)}
            </section>
        </div>
    );
}

export default Home;