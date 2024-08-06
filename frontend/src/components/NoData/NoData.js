import './noDataStyle.css';
import {Link} from "react-router-dom";

const NoData = () => {
    return (
        <>
            <h1>End of road</h1>
            <p className={'data'}>Return to animal part</p>
            <p>
                <Link className={'data-link'} to={'/'}>Return</Link>
            </p>
        </>);
}

export default NoData;