import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () => {
    return(
        <div id="loading-box">
            <Spinner animation="border" role="status" variant="primary" >
                <span className="sr-only">Carregando...</span>
            </Spinner>
        </div>
    );
}

export default Loading;