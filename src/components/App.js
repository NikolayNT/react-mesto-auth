import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC

// api
import {api} from "../utils/Api";
import {apiAuth} from "../utils/ApiAuth";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

import markImageOk from "../images/check-mark-ok.svg";
import markImageCancel from "../images/check-mark-cancel.svg";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const [mail, setMail] = useState('');

  const [isMarkPopupOpen, setIsMarkPopupOpen] = useState(false);
  const [isMarkPopupOkOpen, setIsMarkPopupOkOpen] = useState(false);
  
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

    function handleRegisterOkClick () {
      setIsMarkPopupOkOpen(true);
    }

    function handleRegisterCancelClick () {
      setIsMarkPopupOpen(true);
    }

  function handleAuthorizationClick(dataUser){ // авторизация на сайте
    setLoggedIn(true);
    setMail(dataUser.data.email);
    history.push('/');
  };

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
    setIsMarkPopupOpen(false);
    setIsMarkPopupOkOpen(false);
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
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      apiAuth.identification(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/');
          setMail(res.data.email);
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  tokenCheck(); // проверка, авторизован ли пользователь

  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

return (
  <div className="root">
    <CurrentUserContext.Provider value={currentUser}>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

        <PopupWithForm isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} name='confirm-deletion' title='Вы уверены?' button='Да'/>

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>

        <Header mail={mail} onSignOut={signOut}/>
        
        <Switch>
        
          <ProtectedRoute
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick} 
            onCardDeleteClick={handleDeleteCardClick} 
            cards={cards} 
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}

            component={Main}
            loggedIn={loggedIn}
            exact path="/"
          />

          <Route path="/sign-up">
            <Register header='Регистрация' button='Зарегистрироваться' onRegisterOkClick={handleRegisterOkClick} onRegisterCancelClick={handleRegisterCancelClick}/>
            <InfoTooltip name='mark-ok' isOpen={isMarkPopupOkOpen} onClose={closeAllPopups} image={markImageOk} imageDescription='Галочка' text='Вы успешно зарегистрировались!'/>
            <InfoTooltip name='mark-cancel' isOpen={isMarkPopupOpen} onClose={closeAllPopups} image={markImageCancel} imageDescription='Крестик' text='Что-то пошло не так! Попробуйте ещё раз.'/>
          </Route>

          <Route path="/sign-in">
            <Login header='Вход' button='Войти' onAuthorizationClick={handleAuthorizationClick}/>
          </Route>

          <Route>
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
            <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>

        <Footer />
    </CurrentUserContext.Provider>
  </div>
);
}

export default App;
