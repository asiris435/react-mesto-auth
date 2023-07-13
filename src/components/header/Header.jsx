import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";

function Header ({ name, dataUser }) {

function onSignOut () {
  localStorage.removeItem("jwt");
}

  return (
    <header className="header root__section-header">
      <img
        className="header__logo"
        src={logo}
        alt="изображение логотипа"
      />
      {name === "signup" || name === "signin" ?
        <Link to={name === "signup" ? "/sign-in" : "/sign-up"} className="header__link">
          {name === "signup" ? "Войти" : "Регистрация"}
        </Link>
        :
        <>
          <div className="header__nav-container">
            <p className="header__email">{dataUser}</p>
            <Link to={"/sign-in"} className="header__unlogin" onClick={onSignOut}>Выйти</Link>
          </div>
        </>
      }
    </header>
  );
}

export default Header;