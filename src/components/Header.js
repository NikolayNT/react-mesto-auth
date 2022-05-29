import React from 'react';

function Header(props) {
  return (
    <header className="header">
        <a href="#" className="header__logo"></a>
        <a href="#" className="header__text">{props.text}</a>
    </header>
  );
}
  
export default Header;