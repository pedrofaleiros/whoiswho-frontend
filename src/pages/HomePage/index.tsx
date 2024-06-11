import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { HomeAppBar } from "../../components/HomeAppBar";

import { createRoomService, getUserRoomService } from "../../services/api";
import { MdLogin } from "react-icons/md";
import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from "../../components/common/Buttons";
import { OrDivider } from "../../components/common/Divider";
import { createUserService, sessionUserService } from "../../services/auth";
import { parseCookies } from "nookies";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState<string>("");
  const [lastRoom, setLastRoom] = useState<string | null>(null);

  const { session, createUser, userId, setIsLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const handleCreateUser = async () => {
      const data = await createUserService();
      if (data.id && data.username) {
        createUser({
          userId: data.id,
          username: data.username,
        });
      }
    };

    const handleFindLastRoom = async () => {
      const id = parseCookies()["@whoiswho.userId"];
      if (id) {
        const data = await getUserRoomService(id);
        if (typeof data.roomCode === "string") {
          setLastRoom(data.roomCode);
        }
      }
    };

    const handleSession = async () => {
      try {
        setIsLoading(true);
        const user = session();
        if (user === null) {
          await handleCreateUser();
        } else {
          const data = await sessionUserService(user.userId);
          if (data === null || !data.id || !data.username) {
            await handleCreateUser();
          }
        }
      } catch (_) {
      } finally {
        setIsLoading(false);
        handleFindLastRoom();
      }
    };

    handleSession();
  }, [session, setIsLoading, createUser]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (roomCode.length !== 4) {
      toast.warning("Código da sala inválido");
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

    navigate(`/room/${lastRoom}`);
  };

  const handleCreateRoom = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (userId == null) {
      return;
    }
    try {
      const response = await createRoomService(userId);
      const roomCode = response.roomCode;
      navigate(`/room/${roomCode}`);
    } catch (error) {}
  };

  return (
    <div className="text-center items-center flex flex-col justify-center">
      <HomeAppBar />

      <div className="w-2/3 max-w-xs flex flex-col items-center gap-2">
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

          <PrimaryButton text="Entrar" type="submit" />
        </form>

        {lastRoom && (
          <TextButton
            text={`Sala ${lastRoom}`}
            children={<MdLogin />}
            onClick={handleJoinLastRoom}
          />
        )}

        <div className="h-2 w-full"></div>
        <OrDivider />
        <div className="h-2 w-full"></div>

        <SecondaryButton text="Criar uma sala" onClick={handleCreateRoom} />
      </div>
    </div>
  );
}
