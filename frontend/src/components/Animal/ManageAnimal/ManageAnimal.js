import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './manageAnimalStyle.css'
import ResetScroll from "../../../api/ResetScroll/ResetScroll";
import {getAnimalByUsername} from "../../../api/service/AnimalService";
import AnimalCard from "./AnimalCard/AnimalCard";

const ManageAnimal = () => {
    ResetScroll();
    let [animals, setAnimals] = useState([]);

    useEffect(() => {
        getAnimalByUsername()
            .then(res => res.json())
            .then(data => {
                setAnimals(data)

            })
            .catch(err => err)
    }, []);

    return (
        <>
            <h1>Manage animals</h1>
            <div className={'wrap-manage'}>
                {animals.length > 0 ? animals.map(animal => <AnimalCard key={animal.id} animal={animal}/>) :
                    <div className={'no-content'}>
                        <p>No created animals for now.</p>
                        <Link className={'link'} to={'/animal-add'}>Create animal here</Link>
                    </div>
                }
            </div>
        </>
    );
}

export default ManageAnimal;