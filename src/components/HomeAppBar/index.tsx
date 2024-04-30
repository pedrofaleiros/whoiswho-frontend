import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";

import "./styles.css";

export function HomeAppBar() {
  const { username, logout } = useAuth();

  return (
    <div className="appBar">
      <div className="logo">
        <Impostor className="logoIcon" />
        <h1 className="logoText">WhoIsWho</h1>
      </div>

      <div className="appBarActions">
        {username === null ? (
          <Link className="loginLink" to="/login">
            Entrar
          </Link>
        ) : (
          <p className="username">{username}</p>
        )}

        {username !== null ? <MdLogout onClick={logout} /> : <></>}
      </div>
    </div>
  );
}
