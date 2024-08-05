import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    addFavouriteAnimalToUser,
    addLike,
    getFavouritesAnimalByUsername,
    getAnimalById,
    onAddComment,
    onDeleteComment
} from "../../../api/service/AnimalService";
import './AnimalStyle.css'
import ResetScroll from "../../../api/ResetScroll/ResetScroll";

const Animal = () => {
    ResetScroll();
    const id = useParams();
    let [Animal, setAnimal] = useState([]);
    let [dbError, setDbError] = useState([]);
    let [fieldsCheck, seTFieldsCheck] = useState({allFields: false});
    let [comments, setComments] = useState([]);
    let username = sessionStorage.getItem('authenticatedUser');
    let [likes, setLikes] = useState(0);
    let [allReadyLiked, setAllReadyLiked] = useState(false);
    let [added, setAdded] = useState([]);
    let [peopleWhoLiked, setPeopleWhoLiked] = useState([]);
    let [favAnimal, setFavAnimal] = useState();
    let [ownerOfAnimal, setOwnerOfAnimal] = useState();
    
    useEffect(() => {
        getAnimalById(id.id)
            .then(res => res.json())
            .then(data => {
                setAnimal(data);

                let isOwner = data.creator === username;
                setOwnerOfAnimal(isOwner);

                let peopleWhoLiked = data.likes.map(x => x.ownerOfComment).join(', ');
                setPeopleWhoLiked(peopleWhoLiked);
                setComments(data.comments);
                let date = data.createdDate[0] + "-" + data.createdDate[1] + "-" + data.createdDate[2];
                setAdded(date);

                let likes = data.likes.length;
                setLikes(likes);

                let allReadyLike = Boolean(data.likes.some(x => x.ownerOfComment === username));
                setAllReadyLiked(allReadyLike);
            })
            .catch(err => err);
    }, [id.id, username]);


    useEffect(() => {
        getFavouritesAnimalByUsername(username)
            .then(res => res.json())
            .then(data => {
                let already = data.some(x => x.id === Animal.id);
                setFavAnimal(already);
            }).catch(err => err);
    }, [username, Animal.id])


    function addCommentSubmit(e) {
        e.preventDefault();

        let form = new FormData(e.target);

        let info = form.get('info').trim();

        if (!info || info.length < 2) {
            seTFieldsCheck({allFields: true});
            return;
        }
        seTFieldsCheck({allFields: false});

        onAddComment({
            info, AnimalId: Animal.id,
            ownerOfComment: sessionStorage.getItem('authenticatedUser')
        }).then(res => res.json())
            .then(data => {
                if (data.cause) {
                    let errors = data.cause.split(', ');
                    setDbError(errors);
                    return;
                }

                setComments(oldState => [
                    ...oldState, data
                ]);

            }).catch(err => err);

        e.target.info.value = '';
        setDbError([]);
    }

    function deleteComment(id) {
        onDeleteComment(id).then(res => res.json())
            .then(data => {
                let filteredComments = comments.filter(x => x.id !== data.id);
                setComments(filteredComments);
            })
            .catch(err => err);
    }

    function addLikeToAnimal(username, id) {
        addLike(username, id)
            .then(data => data.json())
            .catch(err => err);
        setLikes(likes + 1);
        setAllReadyLiked(true);
        setPeopleWhoLiked(oldState => [...oldState, ", " + username]);
    }

    function addToFavourites(username, id) {
        addFavouriteAnimalToUser(username, id)
            .then(data => data.json())
            .catch(err => err);
        setFavAnimal(true);
    }

    return (
        <>
            <h1>Single Animal</h1>
            <div className={'wrap'}>
                <p className={'creator'}>Creator: {Animal.creator}</p>
                <div>
                    <div className={'read-head heading'}><i className="fas fa-text-height"></i> name</div>
                    <p className={'read-name'}>{Animal.name}</p>
                </div>
                <div>
                    <div className={'read-head heading'}><i className="fas fa-key"></i> species</div>
                    <p className={'read-species'}>{Animal.species}</p>
                </div>

                <div className={'read-head heading'}><i className="fas fa-file-alt"></i> info</div>
                <p className={'read-info'}>{Animal.info}</p>
                <div>
                    {!ownerOfAnimal ?
                        <div>
                            {favAnimal ?
                                <p className={'all-ready-liked'}>Already added to favourites Animal </p> :
                                <button className={'button-like'} onClick={() => addToFavourites(username, Animal.id)}>
                                    <i className="fas fa-arrow-up"></i> Click to add to favourites this Animal
                                    <i className="fas fa-arrow-up"></i>
                                </button>
                            }

                            {allReadyLiked ? <p className={'all-ready-liked'}>Thanks, you already like the Animal. </p>
                                :
                                <button className={'button-like'} onClick={() => addLikeToAnimal(username, Animal.id)}>
                                    <i className="fas fa-arrow-up"></i> Click to like the Animal
                                    <i className="fas fa-arrow-up"></i>
                                </button>
                            }
                        </div> : ''}
                    <p className={'likes'}><i className="fas fa-thumbs-up"></i> Total likes: {likes}</p>
                </div>
                {peopleWhoLiked.length > 0 ? <p>People who liked: {peopleWhoLiked}</p> : ''}

                <p className={'added'}>Date added: {added}</p>
            </div>
            {fieldsCheck.allFields ? <div className={"warnings-edit"}>Add at least 2 symbols to comment!!!</div> : ''}
            {dbError ? dbError
                .map(x => <div key={x} className={"warnings-edit"}>{x.replaceAll(/[\\[\]]/g, '')}</div>) : ''}
            <form onSubmit={addCommentSubmit}>
                <div className={'add-comment-wrap'}>
                    <label>Add comment</label>
                    <textarea name={'info'}/>
                    <button type='submit'>Add <i className="fas fa-plus"></i></button>
                </div>
            </form>
            <div className={'comments'}>
                {comments.length > 0 ?
                    comments.map((x, id) =>

                        <div key={x.id} className={'read-info'}>
                            <div className={'div-comments'}>
                                <p><i className="fas fa-sort-amount-down"></i> {++id}.</p>
                                <p><i className="fas fa-pen-alt"></i> {x.ownerOfComment} wrote: </p>
                                <p><i className="fas fa-align-right"></i><span
                                    className={'info-data'}> {x.info}</span></p>
                                <p><i className="fas fa-calendar-alt"></i> Date
                                    added: {x.localDate[0] + "-" + x.localDate[1] + "-" + x.localDate[2]}</p>
                            </div>
                            {username === x.ownerOfComment ?
                                <button onClick={() => deleteComment(x.id)} className={'delete-comment'}>
                                    <i className="fas fa-eraser"></i>Delete</button>
                                : ''}
                        </div>)
                    : ''}
            </div>
        </>
    );
}
export default Animal;