import {useEffect, useState} from "react";
import './allAnimalsStyle.css'
import ResetScroll from "../../api/ResetScroll/ResetScroll";
import {getAllAnimal} from "../../api/service/AnimalService";
import AnimalBaseCard from "./AnimalBaseCard/AnimalBaseCard";

const AllAnimal = () => {
    ResetScroll();
    let [animals, setAnimals] = useState([]);

    useEffect(() => {
        getAllAnimal()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAnimals(data);
            })
            .catch(err => err);
    }, []);
    return (
        <>
            <h1>All Animals</h1>
            <section className={'wrap-all'}>
                {animals ? animals.map((animal, id) =>
                        <AnimalBaseCard key={animal.id} animal={animal} id={++id}/>)
                    : <p>No animals in database</p>}
            </section>
        </>
    );
}

export default AllAnimal;