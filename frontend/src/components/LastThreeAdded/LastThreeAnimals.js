import React from "react";
import {Link} from "react-router-dom";

const LastTheeAnimals = ({animal}) => {
  let date = animal?.createdAt.split("T")[0];
  return (
      <section className={'main-section'}>
        <img src={animal.imageUrl} className={'image'}
             alt={"picture-animal"}/>
        <div className={'content'}>
          <p className={'name'}><i className="fas fa-text-height"></i> <span
              className={'property'}>Name:</span> {animal.name} </p>
          <p><i className="fas fa-align-right"></i> <span
              className={'property'}>Info:</span> {animal.info}
          </p>
          <p><i className="fas fa-user"></i> <span className={'property'}>Created by:</span> {animal.createdBy}
          </p>
          <p><i className="fas fa-key"></i> <span
              className={'property'}>Species:</span> {animal?.species.toLowerCase()}
          </p>
          <p><i className="fas fa-calendar-alt"></i> <span
              className={'property'}>Date added:</span> {date}</p>
          <Link className={'animal-card-link'} to={`/animal-read/${animal.id}`}>View animal</Link>
        </div>
      </section>
  );
}

export default LastTheeAnimals