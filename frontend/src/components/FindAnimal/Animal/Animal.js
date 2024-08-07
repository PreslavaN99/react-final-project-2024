import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    addFavouriteAnimalToUser,
    addLike,
    getFavouritesAnimalByUsername,
    getAnimalById,
    onAddComment,
    onDeleteComment,
    adoptAnimalByUser,
    removeAnimalFromUser,
    findAllUsersWhoWantToAdoptByAnimalId
} from "../../../api/service/AnimalService";
import './animalStyle.css'
import ResetScroll from "../../../api/ResetScroll/ResetScroll";

const Animal = () => {
    ResetScroll();
    const id = useParams();
    let [animal, setAnimal] = useState([]);
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
    let [wantToAdopt, setWantToAdopt] = useState();
    let [animalUsers, setAnimalUsers] = useState([]);

    useEffect(() => {
        getAnimalById(id.id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAnimal(data);

                let isOwner = data.createdBy === username;
                setOwnerOfAnimal(isOwner);

                let peopleWhoLiked = data.likes.map(x => x.ownerOfLike).join(', ');
                setPeopleWhoLiked(peopleWhoLiked);
                setComments(data.comments);
                let date = data?.createdAt.split("T")[0];
                setAdded(date);

                let likes = data.likes.length;
                setLikes(likes);

                let allReadyLike = Boolean(
                    data.likes.some(x => x.ownerOfLike === username));
                setAllReadyLiked(allReadyLike);

                let alreadyWantedToAdopt = data.users.some(x => x.username === username);
                setWantToAdopt(alreadyWantedToAdopt);
            })
            .catch(err => err);
    }, [id.id, username]);

    useEffect(() => {
        getFavouritesAnimalByUsername(username)
            .then(res => res.json())
            .then(data => {
                let already = data.some(x => x.id === animal.id);
                setFavAnimal(already);
            }).catch(err => err);
    }, [username, animal.id])

    useEffect(() => {
        findAllUsersWhoWantToAdoptByAnimalId(animal.id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAnimalUsers(data)
            })
            .catch(err => err)
    }, [animal.id])

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
            info, animalId: animal.id,
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

    function adoptAnimal(id) {
        let username = sessionStorage.getItem("authenticatedUser")
        adoptAnimalByUser(username, id)
            .then(date => date.json())
            .catch(err => err);
        setWantToAdopt(true);
    }

    function removeAdoptAnimal(id) {
        let username = sessionStorage.getItem("authenticatedUser")
        removeAnimalFromUser(username, id)
            .then(date => date.json())
            .catch(err => err);
        setWantToAdopt(false);
    }

    return (
        <>
            <h1>Animal</h1>
            <div className={'wrap'}>
                <img src={animal.imageUrl} className={'image'}
                     alt={"picture-animal"}/>
                <p className={'creator'}>Added by: {animal.createdBy}</p>
                <div>
                    <div className={'read-head heading'}>Name: {animal.name}</div>
                </div>
                <div>
                    <div className={'read-head heading'}>
                        <i></i>Species: {animal.species}</div>
                </div>
                <div className={'read-head heading'}><i></i>Info: {animal.info}</div>
                <div>
                    {!ownerOfAnimal ?
                        <div>
                            {favAnimal ?
                                <p className={'all-ready-liked'}>Already added to
                                    favourites Animal </p> :
                                <button className={'button-like'}
                                        onClick={() => addToFavourites(username,
                                            animal.id)}>
                                    <i className="fas fa-arrow-up"></i> Click to add to
                                    favourites this Animal
                                    <i className="fas fa-arrow-up"></i>
                                </button>
                            }

                            {allReadyLiked ? <p className={'all-ready-liked'}>Thanks, you
                                    already like the Animal. </p>
                                :
                                <button className={'button-like'}
                                        onClick={() => addLikeToAnimal(username,
                                            animal.id)}>
                                    <i className="fas fa-arrow-up"></i> Click to like the
                                    Animal
                                    <i className="fas fa-arrow-up"></i>
                                </button>
                            }
                        </div> : ''}
                    <p className={'likes'}><i className="fas fa-thumbs-up"></i> Total
                        likes: {likes}</p>
                </div>
                {peopleWhoLiked.length > 0 ? <p>People who liked: {peopleWhoLiked}</p>
                    : ''}

                <p className={'added'}>Date added: {added}</p>
                {!ownerOfAnimal ?
                    <div>
                        {!wantToAdopt ? <button
                                onClick={() => adoptAnimal(animal.id)}
                                className={'delete-comment'}>
                                <i className="fas fa-eraser"></i>Adopt animal
                            </button> :
                            <button onClick={() => removeAdoptAnimal(animal.id)}
                                    className={'delete-comment'}>
                                <i className="fas fa-eraser"></i>Remove Adopt animal
                            </button>}
                    </div> : ""}

                {ownerOfAnimal && animalUsers.length > 0 ?
                    <div>
                        <p>People who wanted to adopt the animal:</p>
                        {animalUsers ? animalUsers.map(a =>
                                <div key={a}>
                                    <p>Name: {a.username}</p>
                                    <p>Email: {a.email}</p>
                                </div>)
                            :
                            <p>Animal still don't have users in wishlist for adopt</p>
                        }
                    </div> : ""}
            </div>
            {fieldsCheck.allFields ? <div className={"warnings-edit"}>Add at
                least 2 symbols to comment!!!</div> : ''}
            {dbError ? dbError
                .map(x => <div key={x} className={"warnings-edit"}>{x.replaceAll(
                    /[\\[\]]/g, '')}</div>) : ''}
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
                                <p className={'info-data'}><i className="fas fa-sort-amount-down"></i>Number: {++id}.
                                </p>
                                <p className={'info-data'}><i
                                    className="fas fa-pen-alt"></i>Author: {x.ownerOfComment}
                                </p>
                                <p className={'info-data'}><i className="fas fa-align-right"></i><span>Content: {x.content}</span></p>
                                <p className={'info-data'}><i className="fas fa-calendar-alt"></i>Added on: {x?.createdAt.split("T")[0]}</p>
                            </div>
                            {username === x.ownerOfComment ?
                                <button onClick={() => deleteComment(x.id)}
                                        className={'delete-comment'}>
                                    <i className="fas fa-eraser"></i>Delete</button>
                                : ''}
                        </div>)
                    : ''}
            </div>
        </>
    );
}
export default Animal;