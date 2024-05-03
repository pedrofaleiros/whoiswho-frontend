import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { HomeAppBar } from "../../components/HomeAppBar";

import { parseCookies } from "nookies";
import { sessionService } from "../../services/auth";
import { createRoomService, getUserRoomService } from "../../services/api";
import { MdLogin } from "react-icons/md";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState<string>("");

  const { login, logout } = useAuth();

  const navigate = useNavigate();

  const [userToken, setUserToken] = useState<string | null>(null);
  const [lastRoom, setLastRoom] = useState<string | null>(null);

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

          setUserToken(token);

          const data = await getUserRoomService(token);
          if (typeof data.roomCode === "string") {
            setLastRoom(data.roomCode);
          }
        } catch (error) {
          setUserToken(null);
          setLastRoom(null);
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

    if (!userToken) {
      toast.warning("Faça login para entrar em uma sala");
      return;
    }

    navigate(`/room/${roomCode}`);
  };

  const handleJoinLastRoom = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (lastRoom === null) {
      toast.warning("Código da sala inválido");
      return;
    }

    if (!userToken) {
      toast.warning("Faça login para entrar em uma sala");
      return;
    }

    navigate(`/room/${lastRoom}`);
  };

  const handleCreateRoom = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!userToken) {
      toast.warning("Faça login para criar uma sala");
      return;
    }
    try {
      const response = await createRoomService(userToken);
      const roomCode = response.roomCode;

      navigate(`/room/${roomCode}`);
    } catch (error) {}
  };

  return (
    <div className="text-center items-center flex flex-col justify-center">
      <HomeAppBar />

      <div className="w-2/3 max-w-xs flex flex-col items-center">
        {/*  */}
        <form
          className="w-full flex flex-col mt-8 gap-2"
          onSubmit={handleSubmit}
        >
          <p className="text-xl font-mono font-semibold">Entrar em uma sala</p>

          <input
            className="rounded-md bg-gray-900 border-2 border-gray-500 px-2 py-2 text-center text-xl focus:border-gray-300 focus:bg-gray-800 hover:bg-gray-800 outline-none"
            type="number"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Código"
          />

          <button
            className="bg-blue-700 rounded-md py-2 text-base font-medium hover:bg-blue-500"
            type="submit"
          >
            Entrar
          </button>
        </form>

        {userToken && lastRoom && (
          <button
            onClick={handleJoinLastRoom}
            className="flex flex-row items-center gap-2 mt-4 font-mono font-bold text-base text-green-500 hover:bg-gray-900 rounded-md py-2 w-full text-center justify-center"
          >
            {`Sala ${lastRoom}`}
            <MdLogin className="h-6 w-6" />
          </button>
        )}

        <div className="flex flex-row items-center gap-4 my-4">
          <hr className="h-[0.5px]  w-24 bg-gray-500 mt-1 border-none" />
          <p className="text-gray-500 text-sm font-medium">ou</p>
          <hr className="h-[0.5px]  w-24 bg-gray-500 mt-1 border-none" />
        </div>

        <button
          className="rounded-md py-2 px-8 text-base font-medium border-2 hover:bg-gray-900"
          onClick={handleCreateRoom}
        >
          Criar uma sala
        </button>
      </div>
    </div>
  );
}
