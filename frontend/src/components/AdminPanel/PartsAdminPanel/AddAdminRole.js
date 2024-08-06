import Modal from "react-modal";
import {useState} from "react";
import {upgradeRoleOnUser} from "../../../api/service/UserService";

const AddAdminRole = ({fetchUsers, setError}) => {
    const [enterUsernameAdminRole, setEnterUsernameAdminRole] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    function onUpgradeRole() {
        setIsOpen(!isOpen);
        upgradeRoleOnUser(enterUsernameAdminRole)
            .then(res => res.json())
            .then(data => {
                setError(data.message);
            })
            .catch(err => err);
        setEnterUsernameAdminRole('');

    }

    const setUsernameFromInputForAdminRole = (e) => setEnterUsernameAdminRole(e.target.value);

    return (
        <>
            <form className={'role-manage'}>
                <Modal className={'modal-style-likes'}
                       isOpen={isOpen}
                       onRequestClose={toggleModal}
                       contentLabel="Update role"
                       ariaHideApp={false}>
                    <p className={'title-modal-likes'}>Upgrade user authorities:</p>

                    <button onClick={onUpgradeRole} className={'button-animal-edit'}>Add role</button>
                    <button onClick={toggleModal} className={'button-animal-edit'}>Back</button>
                </Modal>
                <p className={'admin-titles'}>Add Admin role to a user</p>
                <label>Enter username (min 1 symbol)</label>
                <input name='username' onChange={setUsernameFromInputForAdminRole} onKeyUp={fetchUsers}/>
                <i className="fas fa-search"></i>
                <button onClick={toggleModal} type="submit"><i className="fas fa-plus"></i> Add</button>
            </form>
        </>
    )
}
export default AddAdminRole;