import "../login/login.css";

export default function Login() {
  return (
    <div className="login">
      <header className="loginHeader">
        <div className="loginHeader__logo">
          <img
            src={require("../../assets/logos/logo-aligned.svg").default}
            alt="Groupomania logo"
          ></img>
        </div>
      </header>
      <div className="loginWrapper">
        <div className="loginTitle">Connexion / Inscription</div>
        <div className="loginTop">
          <form className="loginTop__info">
            <label className="loginTop__info--firstName">
              Prénom{" "}
              <input type="text" name="firstName" placeholder="Janet"></input>
            </label>
            <label className="loginTop__info--lastName">
              Nom <input type="text" name="lastName" placeholder="Kim"></input>
            </label>
            <label className="loginTop__info--email">
              Email{" "}
              <input
                type="text"
                name="email"
                placeholder="janet.hyunjkim@gmail.com"
              ></input>
            </label>
            <label className="loginTop__info--pw">
              Mot de passe{" "}
              <input
                type="text"
                name="password"
                placeholder="mot de passe"
              ></input>
            </label>
          </form>
        </div>
        <div className="loginBottom">
          <button className="loginBottom__login">Se connecter</button>
          <div className="loginBottom__prompt">Pas encore de compte ?</div>
          <button className="loginBottom__signup">Créer un compte</button>
        </div>
      </div>
    </div>
  );
}
