import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [link, setLink] = useState(""); // использую, для очищения попапа после submit
  const avatarRef = useRef();

  useEffect(() => {
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="update-avatar"
      title="Обновить аватар"
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="link-avatar"
        type="url"
        placeholder="Ссылка"
        className="popup__input"
        required
        ref={avatarRef}
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error popup__input-error_type_link-avatar">
        Текст ошибки
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
