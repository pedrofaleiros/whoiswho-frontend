import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { HomeAppBar } from "../../components/HomeAppBar";

import { parseCookies } from "nookies";
import { sessionService } from "../../services/auth";
import { createRoomService } from "../../services/api";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState<string>("");

  const { login, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const session = async () => {
      const _token = parseCookies()["@whoiswho.token"];
      if (_token) {
        try {
          const response = await sessionService(_token);
          const { token, username, id } = response;

          login({
            token: token,
            userId: id,
            username: username,
          });
        } catch (error) {
          logout();
        }
      }
    };

    session();
  }, [login, logout]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (roomCode.length !== 4) {
      toast.warning("Código da sala inválido");
      return;
    }

    const token = parseCookies()["@whoiswho.token"];
    if (!token) {
      toast.warning("Faça login para entrar em uma sala");
      return;
    }

    navigate(`/room/${roomCode}`);
  };

  const handleCreateRoom = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const token = parseCookies()["@whoiswho.token"];
    if (!token) {
      toast.warning("Faça login para criar uma sala");
      return;
    }
    try {
      const response = await createRoomService(token);
      const roomCode = response.roomCode;

      navigate(`/room/${roomCode}`);
    } catch (error) {}
  };

  return (
    <div className="w-full h-screen text-white">
      <HomeAppBar />

      <div className="items-center flex flex-col justify-center mt-4 gap-4 ">
        <p className="text-lg font-medium">Entrar em uma sala</p>
        <form
          className="items-center flex flex-col gap-2 w-2/3 max-w-xs"
          onSubmit={handleSubmit}
        >
          <input
            className="text-gray-300 text-center bg-gray-950 border-2 border-gray-500 w-full rounded-lg p-2 text-xl focus:border-2 focus:outline-none focus:border-blue-600 font-mono"
            type="number"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Código"
          />

          <button
            className=" bg-blue-600 hover:bg-blue-400 text-gray-900 font-bold px-4 py-2 rounded-lg w-full text-xl"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-row items-center gap-4 ">
          <hr className="h-[0.5px]  w-16 bg-gray-500 mt-1 border-none" />
          <p className="text-gray-500 text-sm font-medium">ou</p>
          <hr className="h-[0.5px]  w-16 bg-gray-500 mt-1 border-none" />
        </div>

        <div className="w-full text-center">
          <button
            className="bg-inherit border-blue-600 border-2 rounded-lg px-8 py-2 text-blue-600 font-bold hover:bg-gray-900"
            onClick={handleCreateRoom}
          >
            Criar uma sala
          </button>
        </div>
      </div>
    </div>
  );
}
