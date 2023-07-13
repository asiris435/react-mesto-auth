import useFormValidation from "../../hooks/useFormValidation";
import LoginSection from "../loginSection/LoginSection";

function Login ({ name, handleLogin }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation();

    function onLogin (event) {
        event.preventDefault();
        handleLogin( values.password, values.email);
    }

    return (
        <LoginSection name={name} onSubmit={onLogin} isValid={isValid}>
            <input 
                name="email"
                type="email"
                placeholder={"Email"}
                className={`form__input-text ${isInputValid.email === undefined || isInputValid.email ? "" : "form__input-text_invalid"}`}
                value={values.email || ""}
                onChange={handleChange}
            />
            <span
              id="input-email-error"
              className="form__error">
                {errors.email}
             </span>
            <input 
                name="password"
                type="password"
                placeholder={"Пароль"}
                className={`form__input-text ${isInputValid.password === undefined || isInputValid.password ? "" : "form__input-text_invalid"}`}
                minLength={3}
                value={values.password || ""}
                onChange={handleChange}
            />
            <span
              id="input-email-error"
              className="form__error">
                {errors.password}
             </span>
        </LoginSection>
    );
}

export default Login;