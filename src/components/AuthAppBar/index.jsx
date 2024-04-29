import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";

import "./styles.css";

export function AuthAppBar() {
  return (
    <div className="appBar">
      <Link to="/" replace={true}>
        <div className="logo">
          <Impostor className="logoIcon" />
          <h1 className="logoText">WhoIsWho</h1>
        </div>
      </Link>
    </div>
  );
}
