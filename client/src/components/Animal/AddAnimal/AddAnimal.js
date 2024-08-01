import 'addAnimalStyle.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import AddImg from "./AddImg";


const AnimalAdd = () => {
    let navigate = useNavigate();
    let [fieldsCheck, seTFieldsCheck] = useState({allFields: false});
    let [dbError, setDbError] = useState([]);

    const onSubmitCreate = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);

        let name = form.get('name').trim();
        let info = form.get('info').trim();
        let species = form.get('species').trim();


        if (!name || !info || !species) {
            seTFieldsCheck({allFields: true});
            return;
        }

        seTFieldsCheck({allFields: false});

        onCreate({
                name, species, info,
                username: sessionStorage.getItem('authenticatedUser')
            }
        ).then(res => res.json())
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
                <form onSubmit={onSubmitCreate}>
                    <div className={'inputs'}>

                        <label>Name:</label>
                        <textarea className={'animal-add-name'}
                                  name='name'
                                  placeholder='Pesho'
                        />

                        <label>Species:</label>
                        <textarea className={'animal-add-species'}
                                  name='species'
                                  placeholder='cat'/>

                        <label>Info:</label>
                        <textarea className={'animal-add-info'}
                                  name='info'
                                  placeholder='Pesho is a gentle explorer.He enjoys sunbathing by the window, chasing feather toys, and curling up in cozy corners.'/>

                        <AddImg />

                        <button className={'create-animal-button'} type='submit'>Create</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AnimalAdd;