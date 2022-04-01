import React from 'react';

import './style.css';

import Logo from '../../assets/images/logo.svg';

const Header = () => {
  return(
    <div className="header">
      <div className="header-wrapper">
        <div className="logo">
          <img src={Logo} alt="Logo"/>
          <h1>GitHub<br/>Profile Finder</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;