import "../post/post.css";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="postTop__img"
            src={require("../../assets/profiles/1.png")}
            alt=""
          ></img>
          <span className="postTop__user">User 1</span>
          <span className="postTop__postDate">il y a 5 mins</span>
        </div>
        <div className="postCenter">
          <span className="postCenter__text">Hello</span>
          <img className="postCenter__img" src="" alt=""></img>
        </div>
        <div className="postBottom">
          <div className="postBottom__like">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="postBottom__like--icon"
            />
            <span className="postBottom__like--counter">3</span>
          </div>
          <span className="postBottom__noComments">0 commentaires</span>
        </div>
      </div>
    </div>
  );
}
