import React from 'react';

import './style.css';

import errorIcon from '../../assets/images/error.jpg';

const NotFound = () => {
    return(
        <div id="error-box">
            <img src={errorIcon} alt=""/>
            <span>Usuário não encontrado!</span>
        </div>
    );
}

export default NotFound;