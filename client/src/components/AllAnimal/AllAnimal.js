import {useEffect, useState} from "react";
import {getallAnimal} from "../../api/service/animalservice";
import './allAnimalStyle.css'
import ResetScroll from "../../api/ResetScroll/ResetScroll";

const allAnimal = () => {
    ResetScroll();
    let [animal, setAnimals] = useState([]);

    useEffect(() => {
        getallAnimal()
            .then(res => res.json())
            .then(data => {
                setAnimals(data);
            })
            .catch(err => err);
    }, []);
    return (
        <>
            <h1>All Animals</h1>
            <section className={'wrap-all'}>
                {animals ? animals.map((animal, id) =>
                        <animalBaseCard key={animal.id} animal={animal} id={++id}/>)
                    : <p>No animals in database</p>}
            </section>
        </>
    );
}

export default allAnimal;