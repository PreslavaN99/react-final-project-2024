import './animalBaseCardStyle.css'
import {Link} from "react-router-dom";
import {useState} from "react";
import Modal from "react-modal";

const AnimalBaseCard = ({animal, id}) => {
    let [comments, setComments] = useState({
        commentsData: animal.comments,
        display: false
    });

    const changeR = (e) => e.target.style.color = 'red';
    const changeL = (e) => e.target.style.color = 'lightblue';

    const hide = () => setComments({display: false});
    const show = () => setComments({display: true});

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Modal className={'modal-style-likes'}
                   isOpen={isOpen}
                   onRequestClose={toggleModal}
                   contentLabel="Likes on animal"
                   ariaHideApp={false}>
                <p className={'title-modal-likes'}>Users who liked this animal:</p>

                {animal.likes.length > 0 ? <p>{animal?.likes.map(x => x.ownerOfLike).join(', ')}</p> :
                    <p>No likes</p>}
                <button onClick={toggleModal} className={'button-animal-edit'}>Back</button>
            </Modal>
            <section className={'animal-card'}>
                <div onMouseOver={changeR} onMouseOut={changeL}>
                    <p className={'animal-card-data'}>No: {id}</p>
                    <p className={'animal-card-data'}>Name: {animal.name}</p>
                    <p className={'animal-card-data'}>Species: {animal.species}</p>
                    <p className={'animal-card-data hover-data'}
                       onClick={toggleModal}
                    >Total likes: {animal.likes ? animal.likes.length : 0} (show)</p>
                    <p onMouseEnter={show}
                       onMouseLeave={hide}
                       className={'animal-card-data show-comments'}
                    >Total comments: {animal.comments ? animal.comments.length : 0} </p>
                </div>
                {comments.display ?
                    animal.comments.map((x, id) =>
                        <p key={id} className={'comment'}>{++id}. {x.content}</p>) : ''}

                <Link className={'animal-card-link'} to={`/animal-read/${animal.id}`}>View animal</Link>
            </section>
        </>
    );
}

export default AnimalBaseCard;