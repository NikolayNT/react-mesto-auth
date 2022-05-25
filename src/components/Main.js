import React, {useState, useEffect} from 'react';
import Card from './Card';
import {api} from "../utils/Api";
// импорт контекста
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDeleteClick, cards, onCardLike, onCardDelete}) {
  // Подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="content">
        <section className="profile">
          <div className="profile__avatar-hover" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
          </div>
          <div className="profile__profile-info">
            <h1 className="profile__title-name">{currentUser.name}</h1>
            <button type="button" aria-label="Изменить" className="profile__button-name" onClick={onEditProfile}></button>
            <p className="profile__text">{currentUser.about}</p>
          </div>
          <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="photo">
          <ul className="elements">
            <CardsContext.Provider value={cards}>
            {
              cards.map((item) => (<Card card={item} key={item._id} onCardClick={onCardClick} onCardDeleteClick={onCardDeleteClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>))
            }
            </CardsContext.Provider>
          </ul>
        </section>
      </div>
  );
}
  
export default Main;