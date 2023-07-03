import logo from "../../images/Logo.svg";

function Header () {
  return (
    <header className="header root__section-header">
      <img
        className="header__logo"
        src={logo}
        alt="изображение логотипа"
      />
    </header>
  );
}

export default Header;