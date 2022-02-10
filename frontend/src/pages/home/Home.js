import "../home/home.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Profile from "../profile/Profile";

export default function Home() {
  return (
    <div className="homeContainer">
      <Topbar />
      <Feed />
    </div>
  );
}
