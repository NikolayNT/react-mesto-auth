import React, {useState} from 'react';

import {apiAuth} from "../utils/ApiAuth";


function Login(props) {

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
    const auth = {password, email};
    apiAuth.authorization(auth)
      .then((res) => {
      // после успешной авторизации идентифицируем пользователя
        const jwt = res.token;
        localStorage.setItem('token', jwt);
        apiAuth.identification(jwt)
          .then((res) => {
            props.onAuthorizationClick(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });

      
  }

  return (
  <section className='authorization'>
        <form name=''  className="authorization__form" id='' /*noValidate*/ onSubmit={handleSubmit}>
          <h2 className="authorization__heading">{props.header}</h2>
          <input id="email" type="text" placeholder="Email" className="authorization__input" minLength="2" maxLength="40" required  value={email} onChange={handleChangeEmail}/>
          <input id="password" type="password" placeholder="Пароль" className="authorization__input" minLength="2" maxLength="200" required value={password} onChange={handleChangePassword}/>
          <button type="submit" aria-label='' className="authorization__button">{props.button}</button>
        </form>
    </section>
  );
}
  
export default Login;