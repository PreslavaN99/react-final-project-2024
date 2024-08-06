import {Link} from "react-router-dom";
import './animalCardStyle.css'
import React from "react";

const AnimalCard = ({animal}) => {
  let createdAt = animal?.createdAt.split("T");
  let date = createdAt[0];
  return (
      <section className={'main-section'}>
        <div className={'content'}>
          <img src={animal.imageUrl} className={'image'}
               alt={"picture-animal"}/>
          <p className={'title'}><i className="fas fa-text-height"></i> <span
              className={'property'}>Name:</span> {animal.name} </p>
          <p><i className="fas fa-align-right"></i> <span
              className={'property'}>Info:</span> {animal.info}
          </p>
          <p><i className="fas fa-user"></i> <span className={'property'}>Created by:</span> {animal.createdBy}
          </p>
          <p><i className="fas fa-key"></i> <span
              className={'property'}>Species:</span> {animal.species}</p>
          <p><i className="fas fa-calendar-alt"></i> <span
              className={'property'}>Date added:</span> {date}</p>
        </div>
        <Link className={'link'} to={`/animal/${animal.id}`}>Edit animal</Link>
        <Link className={'link'} to={`/animal-read/${animal.id}`}>View animal</Link>
      </section>
  );
}

export default AnimalCard;