import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import './animalByIdStyle.css';
import '../../Animal/AnimalAdd/addImgStyle.css';
import ResetScroll from "../../../api/ResetScroll/ResetScroll";
import AnimalDeleteModal from "./AnimalDeleteModal/AnimalDeleteModal";
import {editAnimalById, getAnimalById} from "../../../api/service/AnimalService";

const AnimalById = () => {
    ResetScroll();
    const formRef= useRef();
    const [file, setSelectedFile] = useState(null);
    const [defaultSpecies, setDefaultSpecies] = useState();
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const id = useParams();
    let [animal, setAnimal] = useState([]);
    let [fieldsCheck, seTFieldsCheck] = useState({allFields: false});
    let [dbError, setDbError] = useState([]);
    let navigate = useNavigate();
    let [names, setNames] = useState({username: '', user: ''})
    useEffect(() => {
        getAnimalById(id.id)
            .then(res => res.json())
            .then(data => {
                setNames({username: sessionStorage.getItem('authenticatedUser'), user: data.createdBy})
                setAnimal(data);
                setDefaultSpecies(data.species)
            })
            .catch(err => err);
    }, [id.id]);

    function onEdit(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        let name = form.get('name').trim();
        let info = form.get('info').trim();
        let species = form.get('species');

        if (!name || !info || !species) {
            seTFieldsCheck({allFields: true});
            return;
        }
        seTFieldsCheck({allFields: false});
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("species", species);
        formData.append("info", info);
        formData.append("username", sessionStorage.getItem('authenticatedUser'))

        editAnimalById(formData, id.id)
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

    function handleSetSpecies(e){
        setDefaultSpecies(e.target.value)
    }

    return (
        <>
            <h1>Edit animal</h1>
            <form ref={formRef}  onSubmit={onEdit}>
                {fieldsCheck.allFields ? <div className={"warnings-edit"}>Fill all fields!</div> : ''}
                {dbError ? dbError
                    .map(x => <div key={x} className={"warnings-edit"}>{x.replaceAll(/[\\[\]]/g, '')}</div>) : ''}

                <div className={'wrap'}>
                    <label className={'read-head'}>Name</label>
                    <input className={'edit-input title-edit'} name='name'
                           defaultValue={animal.name}/>
                    <label className={'read-head'}>Species</label>
                    <p>You can choose between cat, dog, others like species.</p>
                    <input className={'edit-input keyword'} name='species'
                           defaultValue={animal.species}/>
                    <label className={'read-head'}>Info</label>
                    <textarea className={'edit-input content-edit'} name='info'
                              defaultValue={animal.info}/>

                    <img src={animal.imageUrl} className={'image'}
                         alt={"picture-animal"}/>
                    <div>
                        <label className={'button-animal-edit'}>
                            <input type="file" onChange={handleFileChange}
                                   accept=".jpg,.jpeg,.png,.gif"/>
                            Change Image
                        </label>
                    </div>

                    <button className={'button-animal-edit'}>Save changes
                    </button>
                    <AnimalDeleteModal id={animal.id}/>

                </div>
            </form>
        </>
    );
}

export default AnimalById;