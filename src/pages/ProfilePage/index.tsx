import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { MdPlace } from "react-icons/md";
import { HomeAppBar } from "../../components/HomeAppBar";
import { updateUsernameService } from "../../services/auth";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { username, userId, updateUsername } = useAuth();

  const [inputUsername, setInputUsername] = useState<string>("");
  useEffect(() => {
    if (username !== null && userId !== null) {
      setInputUsername(username);
    } else {
      navigate(`/`, { replace: true });
    }
  }, [username, navigate, userId]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (userId !== null) {
      const data = await updateUsernameService(userId, inputUsername.trim());
      if (data.username) {
        updateUsername(data.username);
        toast.dismiss();
        toast.success("Nome de usuário atualizado com sucesso", {
          position: "bottom-right",
        });
        navigate(`/`, { replace: true });
      } else if (data.message) {
        toast.dismiss();
        toast.warning(data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-start text-lg font-medium">
      <HomeAppBar />

      <form className="flex items-center w-full max-w-lg px-4 mt-4 mb-4 mx-auto">
        <div className="relative w-full">
          <input
            className="w-full text-base rounded-lg block ps-2.5 p-2.5 bg-gray-900 border-gray-500 border-2 outline-none focus:border-white"
            placeholder="Nome de usuário"
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border-none hover:bg-blue-800"
        >
          Salvar
        </button>
      </form>

      <Link
        className="text-green-500 flex flex-row justify-between items-center hover:text-green-400 border-b-[1px] w-full border-gray-700 px-6 py-3 hover:bg-gray-900"
        to="/places"
      >
        <p>Ver Locais</p>
        <MdPlace />
      </Link>

      <Link
        className="text-blue-500 flex flex-row justify-between gap-2 items-center hover:text-blue-400 border-b-[1px] w-full border-gray-700 px-6 py-3 hover:bg-gray-900"
        to="/"
      >
        <p>Voltar</p>
        {/* <MdArrowBack /> */}
      </Link>
    </div>
  );
}
