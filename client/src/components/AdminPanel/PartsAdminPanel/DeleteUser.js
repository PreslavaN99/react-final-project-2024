import {useState} from "react";
import {deleteUser} from "../../../api/service/UserService";
import Modal from "react-modal";

const DeleteUser = ({setError, fetchUsers}) => {
    const [isOpen, setIsOpen] = useState(false);

    const [enterUsernameDelete, setEnterUsernameDelete] = useState('');

    function toggleModal(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    function onDeleteUser() {
        setIsOpen(!isOpen);
        deleteUser(enterUsernameDelete)
            .then(res => res.json())
            .then(data => {
                setError(data.message);
            })
            .catch(err => err);
        setEnterUsernameDelete('');
    }

    const enterUsernameForDelete = (e) => setEnterUsernameDelete(e.target.value);
    return (
        <>
            <form className={'role-manage'}>
                <Modal className={'modal-style-likes'}
                       isOpen={isOpen}
                       onRequestClose={toggleModal}
                       contentLabel="Update role"
                       ariaHideApp={false}>
                    <p className={'title-modal-likes'}>Delete user</p>
                    <button onClick={onDeleteUser} className={'button-joke-edit'}>Delete</button>
                    <button onClick={toggleModal} className={'button-joke-edit'}>Back</button>
                </Modal>
                <p className={'admin-titles'}>Delete user immediately</p>
                <label>Enter username (min 1 symbol)</label>
                <input name='username' onChange={enterUsernameForDelete} onKeyUp={fetchUsers}/> <i
                className="fas fa-search"></i>
                <button onClick={toggleModal} type="submit"><i className="fas fa-eraser"></i> Delete</button>
            </form>
        </>
    )
}

export default DeleteUser;