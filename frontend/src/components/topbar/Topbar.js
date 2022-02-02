import "../topbar/topbar.css";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft"></div>
      <div className="topbarCenter">
        <span className="topbarCenter_logo">
          <img
            src="/images/logos/icon-left-front.png"
            alt="Groupomania logo"
          ></img>
        </span>
      </div>
      <div className="topbarRight">
        {/*drop down menu with profile pic and option to modify or log out*/}
        <img src="/images/" alt="photo de profil" className="topbarRight_img">
          {/*person's icon/profile pic*/}
        </img>
        <div className="topbarRight_links">
          {/*drop down menu with option to modify profile or log out*/}
          <a href="../pages/profile">Modifier</a>
          <a href="../pages/login">Déconnexion</a>
        </div>
      </div>
    </div>
  );
}
