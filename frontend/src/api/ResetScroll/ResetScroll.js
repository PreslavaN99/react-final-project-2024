import {useEffect} from "react";

const ResetScroll = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
}
export default ResetScroll;