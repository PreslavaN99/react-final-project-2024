import React from "react";
import NoData from "../../components/NoData/NoData";

class ErrorCatch extends React.Component {

    state = {hasError: false};

    static getDerivedStateFromError(error) {
        console.log(error);
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log({error, errorInfo});
    }

    render() {
        if (this.state.hasError === true) {
            return <NoData/>;
        }
        return this.props.children;
    }
}

export default ErrorCatch;