import React from 'react';
import { Route, Switch, Link} from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <a href="#" className="header__logo"></a>
        <Switch>
          <Route exact path="/">
            <div className="header__text-block">
              <p className="header__mail">{props.mail}</p>
              <p /*to="/sign-in"*/ className="header__text" onClick={props.onSignOut}>Выйти</p>
            </div>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__text-auth">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__text-auth">Войти</Link>
          </Route>
        </Switch>
    </header>
  );
}
  
export default Header;