import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";


export default function ProfilePage() {
  const { username, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (username === null) navigate("/", { replace: true });
  }, [username, navigate]);

  return (
    <div className="profileContainer">
      <Link className="profileLink" to="/">
        Voltar
      </Link>
      <Link className="profileLink" to="/places">
        Ver Locais
      </Link>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
