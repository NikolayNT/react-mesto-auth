import React, {useState} from 'react';

import {apiAuth} from "../utils/ApiAuth";

function Register(props) {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log('res');
    apiAuth.registration()
      .then((res) => {
        console.log(res);      
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
  <section className='authorization'>
        <form name=''  className="authorization__form" id='' /*noValidate*/ onSubmit={handleSubmit}>
          <h2 className="authorization__heading">{props.header}</h2>
          <input id="email-reg" type="text" placeholder="Email" className="authorization__input" minLength="2" maxLength="40" required  value={email} onChange={handleChangeEmail}/>
            <span className="popup__input-error popup__input-error_type_name">Текст ошибки</span>
          <input id="password-reg" type="password" placeholder="Пароль" className="authorization__input" minLength="2" maxLength="200" required value={password} onChange={handleChangePassword}/>
            <span className="popup__input-error popup__input-error_type_description">Текст ошибки</span>
          <button type="submit" aria-label='' className="authorization__button">{props.button}</button>
          <a href='#' className='authorization__button-link'>Уже зарегестрированы? Войти</a>
        </form>
    </section>
  );
}
  
export default Register;