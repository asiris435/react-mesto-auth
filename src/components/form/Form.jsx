import { useContext } from "react";
import SendingContext from "../../contexts/SendingContext";


function Form ({ name, textButton, children, onSubmit, isValid }) {
    const isSending = useContext(SendingContext);

    return (
        
        <form noValidate name={name} onSubmit={onSubmit} className="form__input">
            {children}
            {name === "signin" || name === "signup" ?
             <button type="submit" className={`form__submit-button ${isSending ? "form__submit-button-loading" : ""} ${isValid ? "" : "form__submit-button_invalid"}`}>
                {isSending ? "" : textButton || "Сохранить"}
             </button>
             :
             <button type="submit" className={`popup__submit-button ${isSending ? "popup__submit-button_loading" : ""} ${isValid ? "" : "popup__submit-button_invalid"}`}>
                {isSending ? "" : textButton || "Сохранить"}
             </button> }
        </form>
    );

    // return (
    //     <form noValidate name={name} onSubmit={onSubmit} className="form__input">
    //       {children}
    //       <button
    //         type="submit"
    //         className={
    //           `${name === "signin" || name === "signup" ? "form__submit-button" : "popup__submit-button"}
    //           ${isSending ? (name === "signin" || name === "signup" ? "form__submit-button-loading" : "popup__submit-button_loading") : ""}
    //           ${isValid ? "" : (name === "signin" || name === "signup" ? "form__submit-button_invalid" : "popup__submit-button_invalid")}`
    //         }
    //         disabled={isSending}
    //       >
    //         {isSending ? "" : textButton || 'Сохранить'}
    //       </button>
    //     </form>
    //   );
}

export default Form;

// function Form ({ name, textButton, children, onSubmit, isValid }) {
//     const isSending = useContext(SendingContext);

//     return (
        
//         <form noValidate name={name} onSubmit={onSubmit} className="form__input">
//             {children}
//             {name === "signin" || name === "signup" ?
//              <button type="submit" className={`form__submit-button ${isSending ? "form__submit-button-loading" : ""} ${isValid ? "" : "form__submit-button_invalid"}`}>
//                 {isSending ? "" : textButton || "Сохранить"}
//              </button>
//              :
//              <button type="submit" className={`popup__submit-button ${isSending ? "popup__submit-button_loading" : ""} ${isValid ? "" : "popup__submit-button_invalid"}`}>
//                 {isSending ? "" : textButton || "Сохранить"}
//              </button> }
//         </form>
//     );
// }