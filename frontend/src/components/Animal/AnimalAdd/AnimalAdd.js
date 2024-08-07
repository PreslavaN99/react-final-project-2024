import './animalAddStyle.css';
import './addImgStyle.css';
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {onCreate} from "../../../api/service/AnimalService";


const AnimalAdd = () => {
    const formRef= useRef();
    const [file, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    let navigate = useNavigate();
    let [fieldsCheck, seTFieldsCheck] = useState({allFields: false});
    let [dbError, setDbError] = useState([]);

    const onSubmitCreate = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
        let name = form.get('name').trim();
        let info = form.get('info').trim();
        let species = form.get('species').trim();

        if (!name || !info || !species || !file) {
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
        onCreate(formData)
        .then(res => res.json())
            .then(data => {
                if (data.cause) {
                    let errors = data.cause.split(', ');
                    setDbError(errors);
                    return;
                }
                navigate('/animal-manage');
            }).catch(err => err);
    }
    return (
        <>
            <h1 className={'add'}>Add Animal</h1>

            <div>
                <p className={'info'}>To create new animal for adoption think about cool name. After that think about keyword, that
                    associate with this animal.
                    Finally fill the info and add picture, click create and find new home and family for him!</p>
                <div>
                    {fieldsCheck.allFields ? <div className={'warnings'}>Fill all fields!</div> : ''}
                    {dbError ? dbError
                        .map(x => <div key={x} className="warnings">{x.replaceAll(/[\\[\]]/g, '')}</div>) : ''}
                </div>
                <form ref={formRef} onSubmit={onSubmitCreate} encType={"multipart/form-data"}>
                    <div className={'inputs'}>

                        <label>Name:</label>
                        <textarea className={'animal-add-name'}
                                  name='name'
                                  placeholder='Pesho'
                        />

                        <label>Species:</label>

                        <select className={'animal-add-species'}>
                            <option value="cat">cat</option>
                            <option value="dog">dog</option>
                            <option value="other">other</option>
                        </select>

                        <label>Info:</label>
                        <textarea className={'animal-add-info'}
                                  name='info'
                                  placeholder='Pesho is a gentle explorer.He enjoys sunbathing by the window, chasing feather toys, and curling up in cozy corners.'/>

                        <div>
                            <label className={'add-img'}>
                                <input type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif"/>
                                Add Image
                            </label>
                        </div>

                        <button className={'create-animal-button'} type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AnimalAdd;