import React, {Component} from 'react';

class Loading extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="spinner-border text-danger mt-5 mb-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Loading;