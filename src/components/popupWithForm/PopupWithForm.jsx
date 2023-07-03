function PopupWithForm ({ name, title, textButton, children, isOpen, onClose, onSubmit, isSending, isValid=true }) {
  return (
    <section aria-label="form" className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h3 className={`popup__title ${name === "delete" ? "popup__title_type_delete" : ""}`}>{title}</h3>
        <button aria-label="Close" type="button" className="popup__close" onClick={onClose}/>
        <form name={name} className={`popup__input popup__input_type_${name}`} noValidate onSubmit={onSubmit}>
          {children}
          <button 
            type="submit" 
            className={`popup__submit-button ${isSending ? "popup__submit-button_loading" : ""} ${isValid ? "" : "popup__submit-button_invalid"}`}
            disabled={isSending}
          >
            {isSending ? "" : textButton||"Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;