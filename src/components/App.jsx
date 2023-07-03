import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import Main from "./main/Main.jsx";
import PopupWithForm from "./popupWithForm/PopupWithForm.jsx";
import ImagePopup from "./imagePopup/ImagePopup.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./editProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./editAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./addPlacePopup/AddPlacePopup.jsx";

function App () {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeletePopupClick (cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  
  function handleCardDelete (event) {
    event.preventDefault();
    setIsSending(true);
    api.deleteCard(deleteCardId)
    .then(() => {
      setCards(cards.filter((item) => {
        return item._id !== deleteCardId;
      }));
      closeAllPopups();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleUpdateUser (userData, reset) {
    setIsSending(true);
    api.setUserInfo(userData)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleUpdateAvatar (userData, reset) {
    setIsSending(true);
    api.setUserAvatar(userData)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  function handleAddPlaceSubmit (userData, reset) {
    setIsSending(true);
    api.addPhoto(userData)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
      reset();
      setIsSending(false);
    })
    .catch((err) => console.error(err))
    .finally(() => setIsSending(false));
  }

  useEffect (() => {
    setIsLoading(true);
    Promise.all([api.getUserProfileInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <div className="root">
          <Header />

          <Main 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            isLoading={isLoading}
            onClickDelete={handleDeletePopupClick}
          />

          <Footer />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            isSending={isSending} 
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar} 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isSending={isSending}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            textButton="Да"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            isSending={isSending}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;