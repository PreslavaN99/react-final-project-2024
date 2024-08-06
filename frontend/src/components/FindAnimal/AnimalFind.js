import './animalFindStyle.css';
import {useEffect, useState} from "react";
import {getAnimalByMostLikes, getAnimalsFromDbByspecies, getLastThreeAnimals} from "../../api/service/AnimalService";
import {Link} from "react-router-dom";
import ResetScroll from "../../api/ResetScroll/ResetScroll";
import LastTheeAnimals from "../LastThreeAdded/LastThreeAnimals";

const AnimalFind = () => {
    ResetScroll();
    let [animals, setAnimals] = useState([]);
    let [lastTheeAnimals, setLastTheeAnimals] = useState([]);
    let [mostLiked, setMostLiked] = useState([]);

    function getAnimalsByKeyword(e) {
        let species = e.currentTarget.value;
        if (species.length > 1 || species) {
            getAnimalsFromDbByspecies(species)
                .then(res => res.json())
                .then(data => {
                    setAnimals(data)
                }).catch(err => err);
        } else {
            setAnimals([])
        }
    }

    useEffect(() => {
        getAnimalByMostLikes()
            .then(res => res.json())
            .then(data => {
                setMostLiked(data);
            })
            .then(err => err);
    }, [])

    useEffect(() => {
        getLastThreeAnimals()
            .then(res => res.json())
            .then(data => {
                setLastTheeAnimals(data)
            }).catch(err => err);
    }, [])


    return (
        <>
            <h1>Find Animals and fun stories</h1>
            {mostLiked ?
                <div className={'most-liked'}>
                    <p>Check the most liked Animal:</p>
                    <ul className={'ul-usernames'}>{mostLiked.map(x =>
                        <li key={x.id} className={'li-usernames best-animal'}>
                            <Link className={'animal-read-link'} to={`/animal-read/${x.id}`}>Name: {x.name}</Link>
                        </li>)}</ul>
                </div>
                : 'Not enough likes'}

            <section className={'all-Animals'}>
                <Link className={'link-all'} to={'/find-all'}> <i className="fas fa-list"></i> Here can view all
                    Animals</Link>
            </section>

            <div className={'search-keyword-wrap'}>
                <div className={'div-search-keyword-wrap'}>
                    <label className={'label'}>Find by keyword</label>
                    <input className={'input-keyword-search'} name='keyword' onKeyUp={getAnimalsByKeyword}/>

                </div>
                {
                    animals.length >= 1 ?
                        <div>
                            <p className={'p-fetch-usernames'}>Animals (name) from database</p>
                            <ul className={'ul-usernames'}>{animals.map(x =>
                                < li key={x.id} className={'li-usernames'}>
                                    <Link className={'Animal-read-link'} to={`/Animal-read/${x.id}`}>{x.name}</Link>
                                </li>)}</ul>
                        </div>
                        : ''
                }
            </div>
            <div className={'lastThree'}>
                <h2 className={'h2-three'}><i className="fas fa-long-arrow-alt-down"></i> Here can read last three added
                    Animals <i className="fas fa-long-arrow-alt-down"></i></h2>
                {lastTheeAnimals.map(x => <LastTheeAnimals key={x.id} animal={x}/>)}
            </div>
        </>
    );
}

export default AnimalFind;