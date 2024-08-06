import '../Animal/ManageAnimal/AnimalCard/animalCardStyle.css'

const AnimalFav = ({animal, username, deleteFavanimal}) => {
    let date = animal?.createdAt.split("T")[0];
    return (
        <section className={'main-section'}>
            <div className={'info'}>
                <p className={'name'}><i className="fas fa-text-height"></i> <span
                    className={'property'}>Name:</span> {animal.name} </p>
                <p><i className="fas fa-align-right"></i> <span className={'property'}>Info:</span> {animal.info}
                </p>
                <p><i className="fas fa-user"></i> <span className={'property'}>Created by:</span> {animal.createdBy}</p>
                <p><i className="fas fa-key"></i> <span className={'property'}>Species:</span> {animal.species}</p>
                <p><i className="fas fa-calendar-alt"></i> <span className={'property'}>Date added:</span> {date}</p>

                <button onClick={() => deleteFavanimal({username, id: animal.id})} className={'button-animal-edit'}>Remove
                    favourite animal <i className="fas fa-eraser"></i>
                </button>

            </div>
        </section>
    );
}

export default AnimalFav;