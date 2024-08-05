const LastTheeAnimals = ({animal}) => {
    let date = animal.createdDate[0] + "-" + animal.createdDate[1] + "-" + animal.createdDate[2];
    return (
        <section className={'main-section'}>
            <div className={'content'}>
                <p className={'name'}><i className="fas fa-text-height"></i> <span
                    className={'property'}>Title:</span> {animal.title} </p>
                <p><i className="fas fa-align-right"></i> <span className={'property'}>Content:</span> {animal.content}
                </p>
                <p><i className="fas fa-user"></i> <span className={'property'}>Created by:</span> {animal.creator}</p>
                <p><i className="fas fa-key"></i> <span className={'property'}>Keyword:</span> {animal.keyword}</p>
                <p><i className="fas fa-calendar-alt"></i> <span className={'property'}>Date added:</span> {date}</p>
            </div>
        </section>
    );
}


export default LastTheeAnimals;