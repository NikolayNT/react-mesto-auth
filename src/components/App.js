import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  // забрали из майн
  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);      
      })
      .catch(err => {
        console.log(err);
      });
    api.getUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) =>{
        console.log(err);
      })
    }, []);

    function handleCardLike(card) { // проверить с пропсом
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
    }
  
    function handleCardDelete(card){
      api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(cardItem => card._id != cardItem._id));
      })
      .catch(err => {
        console.log(err);
      });
    }
  ////

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card){
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleDeleteCardClick(card){
    setIsDeletePlacePopupOpen(true);
  };

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
  }

  function handleUpdateUser(userData){
    api.putchtUser(userData)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(userAvatar){
    api.updateAvatar(userAvatar.avatar)
    .then((res) => {
      setCurrentUser(res);
      console.log(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleAddPlace(newCard){
    api.postCard(newCard)
    .then((res) => {
      setCards([res, ...cards]);
      console.log(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

return (
  <div className="root">
    <CurrentUserContext.Provider value={currentUser}>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

        <PopupWithForm isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} name='confirm-deletion' title='Вы уверены?' button='Да'/>

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>

        <Header />

        <Main onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardDeleteClick={handleDeleteCardClick} 
          cards={cards} 
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

    </CurrentUserContext.Provider>
  </div>
);
}

export default App;
