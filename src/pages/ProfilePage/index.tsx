import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { MdArrowBack, MdLogout, MdPlace } from "react-icons/md";
import { HomeAppBar } from "../../components/HomeAppBar";

export default function ProfilePage() {
  const { username, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (username === null) navigate("/", { replace: true });
  }, [username, navigate]);

  return (
    <div className="flex flex-col items-start text-lg font-medium">
      <HomeAppBar />

      <Link
        className="text-green-500 flex flex-row justify-between items-center hover:text-green-400 border-b-[1px] w-full border-gray-700 px-6 py-3 hover:bg-gray-900"
        to="/places"
      >
        <p>Ver Locais</p>
        <MdPlace />
      </Link>
      
      <button
        className=" text-red-500  flex flex-row justify-between items-center hover:text-red-400 border-b-[1px] w-full border-gray-700 px-6 py-3 text-start hover:bg-gray-900"
        onClick={logout}
      >
        <p>Sair da conta</p>
        <MdLogout />
      </button>

      {/* <Link
        className="text-blue-500 flex flex-row justify-center gap-2 items-center hover:text-blue-400 border-b-[1px] w-full border-gray-700 px-6 py-3 hover:bg-blue-950 bg-gray-900"
        to="/"
      >
        <MdArrowBack />
        <p>Voltar</p>
      </Link> */}
    </div>
  );
}
