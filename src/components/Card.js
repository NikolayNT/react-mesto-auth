import React from 'react';
// импорт контекста
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  

  const currentUser = React.useContext(CurrentUserContext);
  
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__button-delete ${isOwn ? '' : 'elements__button-delete_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__button-view ${isLiked ? 'elements__element_active' : ''}`
  );

  function handleClick(){
    props.onCardClick(props.card);
  }

  function handleLikeClick(){
    props.onCardLike(props.card);
  }

  function handleDeleteClick(){
    props.onCardDelete(props.card);
  }

  return (<li className="elements__element">
    <button type="button" aria-label="Удалить" className={cardDeleteButtonClassName} onClick={/*props.onCardDeleteClick*/handleDeleteClick}></button>
    <img alt={props.card.name} className="elements__img" src={props.card.link} onClick={handleClick}/>
    <div className="elements__interaction">
      <h2 className="elements__text">{props.card.name}</h2>
      <div className="elements__like-group">
        <button type="button" aria-label="Оценить" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <p className="elements__like-quantity">{props.card.likes.length}</p>
      </div>
    </div>
    </li>
  );
}
  
export default Card;