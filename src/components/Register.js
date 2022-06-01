import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiAuth } from "../utils/ApiAuth";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    apiAuth
      .registration({ email, password })
      .then(() => {
        props.onRegisterOkClick();
      })
      .catch((err) => {
        props.onRegisterCancelClick();
        console.log(err);
      });
  }

  return (
    <section className="authorization">
      <form
        name=""
        className="authorization__form"
        id=""
        /*noValidate*/ onSubmit={handleSubmit}
      >
        <h2 className="authorization__heading">{props.header}</h2>
        <input
          id="email-reg"
          type="text"
          placeholder="Email"
          className="authorization__input"
          minLength="2"
          maxLength="40"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          id="password-reg"
          type="password"
          placeholder="Пароль"
          className="authorization__input"
          minLength="2"
          maxLength="200"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <button type="submit" aria-label="" className="authorization__button">
          {props.button}
        </button>
        <Link to="/sign-in" className="authorization__button-link">
          Уже зарегестрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default Register;
