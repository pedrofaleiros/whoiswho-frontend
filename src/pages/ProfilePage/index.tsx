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
    <div className="flex flex-col items-start gap-2 text-lg font-medium">
      <Link
        className="text-blue-500 hover:text-blue-400 border-b-2 w-full border-gray-700 p-2"
        to="/"
      >
        Voltar
      </Link>
      <Link
        className="text-green-500 hover:text-green-400 border-b-2 w-full border-gray-700 p-2"
        to="/places"
      >
        Ver Locais
      </Link>
      <button
        className="text-red-500 hover:text-red-400 border-b-2 w-full border-gray-700 p-2 text-start"
        onClick={logout}
      >
        Sair da conta
      </button>
    </div>
  );
}
