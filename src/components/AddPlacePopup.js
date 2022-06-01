import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // Стейт, в котором содержится значение инпута
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    handleAddPlaceSubmit();
  }

  function handleAddPlaceSubmit() {
    props.onAddPlace({
      name: place,
      link: link,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add"
      title="Новое место"
      button="Создать"
      onSubmit={handleSubmit}
    >
      <input
        id="place-card"
        type="text"
        placeholder="Название"
        className="popup__input"
        minLength="2"
        maxLength="30"
        required
        value={place}
        onChange={handleChangePlace}
      />
      <span className="popup__input-error popup__input-error_type_place-card">
        Текст ошибки
      </span>
      <input
        id="link-card"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error popup__input-error_type_link-card">
        Текст ошибки
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
