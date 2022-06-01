import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  // Стейт, в котором содержится значение инпута
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser.name != undefined) setName(currentUser.name);
    if (currentUser.about != undefined) setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="change-profile"
      title="Редактировать профиль"
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        type="text"
        placeholder="Имя"
        className="popup__input"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error popup__input-error_type_name">
        Текст ошибки
      </span>
      <input
        id="description"
        type="text"
        placeholder="О себе"
        className="popup__input"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error popup__input-error_type_description">
        Текст ошибки
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
