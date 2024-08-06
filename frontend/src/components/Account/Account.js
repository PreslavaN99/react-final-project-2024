import {getUserByUsername} from "../../api/service/UserService";
import {useEffect, useState} from "react";
import './accountStyle.css'
import {Link, useNavigate} from "react-router-dom";
import {
  deleteFavAnimalByUsernameAndId,
  getCommentedAnimalByUsername,
  getFavouritesAnimalByUsername
} from "../../api/service/AnimalService";
import CommentedAnimal from "./CommentedAnimal/CommentedAnimal";
import AnimalFav from "./AnimalFav";

const Account = () => {
  let navigate = useNavigate();
  let username = sessionStorage.getItem('authenticatedUser');
  let [user, setUser] = useState([]);
  let [date, setDate] = useState([]);
  let [roles, setRoles] = useState([]);
  let [favouritesAnimal, setFavouritesAnimal] = useState([]);
  let [names, setNames] = useState({username: '', user: ''})

  let [commentedAnimals, setCommentedAnimals] = useState([]);

  useEffect(() => {
    getCommentedAnimalByUsername(username)
    .then(res => res.json())
    .then(data => {
      setCommentedAnimals(data)
    }).catch(err => err);
  }, [username])
  useEffect(() => {
    getUserByUsername(username)
    .then(res => res.json())
    .then(data => {
      setUser(data)
      setNames({username: username, user: data.username})
      setRoles(data.authorities.map(x => x.authority + " "));
      let date = data?.createdAt.split("T")[0];
      setDate(date)
    })
    .catch(err => err);
  }, [username])

  useEffect(() => {
    getFavouritesAnimalByUsername(username)
    .then(res => res.json())
    .then(data => {
      setFavouritesAnimal(data);
    }).catch(err => err)
  }, [username]);

  function deleteFavAnimal({username, id}) {

    deleteFavAnimalByUsernameAndId(username, id)
    .then(res => res.json())
    .then(data => {
      let filteredFavAnimals = favouritesAnimal.filter(
          x => x.id !== data.animalId);
      setFavouritesAnimal(filteredFavAnimals);
    }).catch(err => console.log(err))
  }

  roles = roles.map(x => x.toLowerCase().replace('role_', ' ')).join(', ');

  let usernameData = user.username;
  let email = user.email;

  useEffect(() => {
    let owner = names.username === names.user;
    if (!owner) {
      navigate('/');
    }
  }, [names, navigate])

  return (
      <div className={'wrap-main'}>
        <h1>{usernameData}'s account</h1>
        <div className={'profile'}>
          <p className={'futura'}><i className="fas fa-user"></i><span
              className={'account-data'}> Username:</span> {usernameData}</p>
          <p className={'futura'}><i className="fas fa-envelope-open"></i><span
              className={'account-data'}> Email:</span> {email}</p>
          <p className={'futura'}><i className="far fa-address-book"></i><span
              className={'account-data'}> User ID:</span> {user.id}
          </p>
          {date === 'Invalid date' ? '' :
              <p className={'futura'}><i
                  className="far fa-calendar-alt"></i><span
                  className={'account-data'}> Date joined:</span> {date}
              </p>}
          <p className={'futura'}><i className="fas fa-user-shield"></i><span
              className={'account-data'}>Roles:</span> {roles}</p>
        </div>
        <div className={'div-buttons'}>
          <Link className={'link pad'} to={'/Animal-add'}>Create Animal here <i
              className="fas fa-greater-than"></i></Link>
          <Link className={'link pad'} to={'/Animal-find'}>Find Animals here <i
              className="fab fa-searchengin"></i></Link>
        </div>
        <div className={'wrap-commented-Animals'}>
          <p className={'commented-Animals-head'}>Commented Animals by you </p>
          <section className={'commented-Animals'}>
            {commentedAnimals.length ?
                commentedAnimals.map(
                    (x, id) => <CommentedAnimal key={++id} animal={x}/>)
                :
                <p>No commented Animals so far</p>
            }
          </section>
        </div>
        <div className={'wrap-cards fav'}>
          <p className={'title-fav'}>Favourites Animals</p>

          {favouritesAnimal.length ? favouritesAnimal.map(
                  x => <AnimalFav key={x.id} animal={x} username={username}
                                  deleteFavanimal={deleteFavAnimal}/>)
              : <div className={'fav-no'}>No favourites Animal for now</div>}
        </div>
      </div>
  );
}

export default Account;