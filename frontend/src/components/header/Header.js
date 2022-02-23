import "../../components/header/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img
          src={require("../../assets/logos/logo-aligned.svg").default}
          alt="Groupomania logo"
        ></img>
      </div>
    </header>
  );
}
