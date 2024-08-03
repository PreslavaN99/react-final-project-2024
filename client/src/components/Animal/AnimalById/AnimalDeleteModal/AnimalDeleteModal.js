import Modal from "react-modal";
import {useState} from "react";
import {deleteAnimalById} from "../../../../api/service/animalService";
import {useNavigate} from "react-router-dom";

const AnimalDeleteModal = (id) => {

    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    function toggleModal(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }


    function onDelete() {

        deleteAnimalById(id)
            .then(res => res.json())
            .catch(err => err);
        navigate('/');
    }

    return (
        <>
            <Modal className={'modal-style-likes'}
                   isOpen={isOpen}
                   onRequestClose={toggleModal}
                   contentLabel="Update role"
                   ariaHideApp={false}>
                <p className={'title-modal-likes'}>Delete animal</p>
                <button onClick={onDelete} className={'button-animal-edit'}>Delete</button>
                <button onClick={toggleModal} className={'button-animal-edit'}>Back</button>
            </Modal>
            <button onClick={toggleModal} className={'button-animal-edit'}>Delete animal immediately</button>
        </>
    )
}

export default AnimalDeleteModal;