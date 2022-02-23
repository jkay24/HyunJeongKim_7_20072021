import "../home/home.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";

export default function Home() {
  return (
    <div className="home">
      <Topbar />
      <Feed />
    </div>
  );
}
