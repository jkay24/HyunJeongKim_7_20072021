import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";

export default function Home() {
  return (
    <div className="homeContainer">
      <Topbar />
      <Feed />
    </div>
  );
}
