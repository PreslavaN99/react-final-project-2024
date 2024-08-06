import {Link} from "react-router-dom";
import './commentedAnimalStyle.css'

const CommentedAnimal = ({animal}) => {
    return (
        <div className={'commented-wrap'}>
            <p><span className={'commented-name'}>Name:</span> {animal.name}</p>
            <Link className={'commented-link'} to={`/animal-read/${animal.id}`}>Read
                <i className="fab fa-readme"></i></Link>
        </div>
    )
}
export default CommentedAnimal;