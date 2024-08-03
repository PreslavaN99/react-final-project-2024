import {useNavigate, useParams} from "react-router-dom";
import {editAnimalById, getAnimalById} from "../../../api/service/animalService";
import {useEffect, useState} from "react";
import './animalByIdStyle.css';
import ResetScroll from "../../../api/ResetScroll/ResetScroll";
import AnimalDeleteModal from "./AnimalDeleteModal/AnimalDeleteModal";

const AnimalById = () => {
    ResetScroll();
    const id = useParams();
    let [animal, setAnimal] = useState([]);
    let [fieldsCheck, seTFieldsCheck] = useState({allFields: false});
    let [dbError, setDbError] = useState([]);
    let navigate = useNavigate();
    let [names, setNames] = useState({username: '', user: ''})
    useEffect(() => {Animal(id.id)
            .then(res => res.json())
            .then(data => {
                setNames({username: sessionStorage.getItem('authenticatedUser'), user: data.creator})
                setAnimal(data);
            })
            .catch(err => err);
    }, [id.id]);

    function onEdit(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        let name = form.get('name');
        let info = form.get('info');
        let species = form.get('species');
        if (!name || !info || !species) {
            seTFieldsCheck({allFields: true});
            return;
        }
        seTFieldsCheck({allFields: false});


        editAnimalById({name, species, info, id: id.id})
            .then(res => res.json())
            .then(data => {
                if (data.cause) {
                    let errors = data.cause.split(', ');
                    setDbError(errors);
                    return;
                }
                navigate('/animal-manage')
            })
            .catch(err => err);

    }

    useEffect(() => {
        let owner = names.user === names.username;
        if (!owner) {
            navigate('/');
        }
    }, [names, navigate])


    return (
        <>
            <h1>Edit animal</h1>
            <form onSubmit={onEdit}>
                {fieldsCheck.allFields ? <div className={"warnings-edit"}>Fill all fields!</div> : ''}
                {dbError ? dbError
                    .map(x => <div key={x} className={"warnings-edit"}>{x.replaceAll(/[\\[\]]/g, '')}</div>) : ''}

                <div className={'wrap'}>
                    <label className={'read-head'}>name</label>
                    <input className={'edit-input name-edit'} name='name' defaultValue={animal.name}/>
                    <label className={'read-head'}>species</label>
                    <input className={'edit-input species'} name='species' defaultValue={animal.species}/>
                    <label className={'read-head'}>info</label>
                    <textarea className={'edit-input info-edit'} name='info' defaultValue={animal.info}/>
                    <button className={'button-animal-edit'}>Save changes</button>
                    <AnimalDeleteModal id={animal.id}/>
            
                </div>
            </form>
        </>
    );
}

export default AnimalById;