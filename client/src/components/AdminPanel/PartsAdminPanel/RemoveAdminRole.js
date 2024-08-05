import {useState} from "react";
import Modal from "react-modal";
import {removeRoleOnUser} from "../../../api/service/UserService";

const RemoveAdminRole = ({fetchUsers, setError}) => {
    const [enterUsernameRemoveAdminRole, setEnterUsernameRemoveAdminRole] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    function onRemoveRole() {
        setIsOpen(!isOpen);
        removeRoleOnUser(enterUsernameRemoveAdminRole)
            .then(res => res.json())
            .then(data => {
                setError(data.message);
            })
            .catch(err => err);
        setEnterUsernameRemoveAdminRole('');
    }

    const setUsernameFromInputForRemoveAdmin = (e) => setEnterUsernameRemoveAdminRole(e.target.value);

    return (
        <>
            <form className={'role-manage'}>
                <Modal className={'modal-style-likes'}
                       isOpen={isOpen}
                       onRequestClose={toggleModal}
                       contentLabel="Update role"
                       ariaHideApp={false}>
                    <p className={'title-modal-likes'}>Remove user authorities:</p>
                    <button onClick={onRemoveRole} className={'button-joke-edit'}>Remove role</button>
                    <button onClick={toggleModal} className={'button-joke-edit'}>Back</button>
                </Modal>
                <p className={'admin-titles'}>Remove Admin role of a user</p>
                <label>Enter username (min 1 symbol)</label>
                <input name='username' onChange={setUsernameFromInputForRemoveAdmin}
                       onKeyUp={fetchUsers}/> <i className="fas fa-search"></i>
                <button onClick={toggleModal}><i className="fas fa-minus"></i> Remove</button>
            </form>
        </>
    )
}

export default RemoveAdminRole;