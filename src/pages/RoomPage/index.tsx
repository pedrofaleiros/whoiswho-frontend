import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import socket from "../../socket";

import { SocketConst } from "../../utils/SocketConst";
import { toast } from "react-toastify";

import PlayersList from "../../components/PlayersList";
import GameResult from "../../components/GameResult";
import { ImpostorsList } from "../../components/ImpostorsList";
import { PlayingRoom } from "../../components/PlayingRoom";
import RoomAppBar from "../../components/RoomAppBar";

import { parseCookies } from "nookies";
import { PlayerModel } from "../../models/PlayerModel";
import { GameModel, ProfessionModel } from "../../models/GameModel";
import { TextButton } from "../../components/common/Buttons";
import { Divider } from "../../components/common/Divider";
import { MdPlayArrow } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import { CategoryModel } from "../../models/CategoryModel";
import { getCategoriesService } from "../../services/api";
import { CategoriesADM, GameCategory } from "../../components/GameCategory";

export function RoomPage() {
  const { room } = useParams();
  const [userId, setUserId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [gameStatus, setGameStatus] = useState<string>("idle");
  const [admId, setAdmId] = useState<string>("");

  const [impostors, setImpostors] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const [count, setCount] = useState<string>("");

  const [gameData, setGameData] = useState<GameModel | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      if (userId !== null) {
        try {
          const data = await getCategoriesService();
          setCategories(data);
        } catch (error) {}
      }
    };

    const cookies = parseCookies();
    const _userId = cookies["@whoiswho.userId"];

    if (_userId && room !== undefined) {
      setUserId(_userId);
    } else {
      toast.warning("Faça login para entrar na sala");
      navigate("/", { replace: true });
      return;
    }

    socket.connect();

    socket.on("connect", () => {
      socket.emit("joinRoom", {
        roomCode: room,
        userId: userId,
      });
    });

    socket.on(SocketConst.GAME_IMPOSTORS, (data) => {
      try {
        setImpostors(data);
      } catch (error) {}
    });

    socket.on(SocketConst.GAME_CATEGORY, (data) => {
      try {
        setCategory(data);
      } catch (error) {}
    });

    socket.on(SocketConst.GAME_STATUS, (data) => {
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
      try {
        setGameStatus(data);
      } catch (error) {}
    });

    socket.on(SocketConst.GAME_PLAYERS, (data) => {
      try {
        const players = data["players"] as PlayerModel[];
        setPlayers(players);
        setAdmId(data["admId"]);
      } catch (error) {}
    });

    socket.on(SocketConst.ERROR, (data) => {
      if (data) {
        toast.warning(data, { position: "bottom-right" });
      }
    });

    socket.on(SocketConst.GAME_DATA, (data) => {
      try {
        const professions = data["professions"] as ProfessionModel[];
        setGameData({
          place: data["place"] as string,
          professions: professions,
        });
      } catch (error) {}
    });

    socket.on(SocketConst.WARNING, (data) => {
      try {
        toast.warning(data, { position: "bottom-right" });
      } catch (error) {}
    });

    socket.on("count", (data) => {
      try {
        setCount(data);
      } catch (error) {}
    });

    socket.on("disconnect", () => {
      navigate("/", { replace: true });
    });

    getCategories();

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [room, userId, navigate]);

  const handleSetImpostors = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    socket.emit(SocketConst.SET_IMPOSTORS, {
      userId: userId,
      roomCode: room,
      num: impostors === 1 ? 2 : impostors === 2 ? 3 : 1,
    });
  };

  const setRoomCategory = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => {
    event.preventDefault();
    socket.emit(SocketConst.SET_CATEGORY, {
      userId: userId,
      roomCode: room,
      categoryId: id,
    });
  };

  const handleStartGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.emit(SocketConst.START_GAME, { userId: userId });
  };

  const handleFinishGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.emit(SocketConst.FINISH_GAME, { userId: userId });
  };

  const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.disconnect();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <RoomAppBar handleClick={handleBackClick} roomCode={room ?? ""} />
        <FiLoader className="animate-spin size-6 mt-16" />
      </div>
    );
  }

  if (gameStatus === "playing" && gameData !== null) {
    return (
      <>
        <RoomAppBar
          handleClick={handleBackClick}
          roomCode={room ?? ""}
          action={
            admId === userId && (
              <TextButton onClick={handleFinishGame} text="Finalizar" />
            )
          }
        />
        {gameData !== null && (
          <PlayingRoom
            admId={admId}
            userId={userId}
            game={gameData}
            handleFinishGame={handleFinishGame}
          />
        )}
      </>
    );
  }

  return (
    <div className="overflow-hidden w-full flex flex-col items-center">
      <RoomAppBar
        handleClick={handleBackClick}
        roomCode={room ?? ""}
        action={
          admId === userId && (
            <TextButton onClick={handleStartGame} text="Iniciar">
              <MdPlayArrow />
            </TextButton>
          )
        }
      />

      <div className="px-4 py-4 w-full max-w-md ">
        {count !== "" && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-75 bg-black text-center">
            <p className="bg-gray-800 mx-8 mt-48 rounded-3xl py-8 px-2 text-green-500 font-bold font-mono text-lg">
              {count}
            </p>
          </div>
        )}

        <GameCategory category={category} />

        {admId === userId && (
          <CategoriesADM
            categories={categories}
            category={category}
            handle={setRoomCategory}
          />
        )}

        {admId === userId && <Divider />}

        <ImpostorsList
          impostors={impostors}
          isAdm={admId === userId}
          handle={handleSetImpostors}
        />

        <Divider />

        <PlayersList players={players} admId={admId} userId={userId} />

        <Divider />

        {gameStatus === "finished" && gameData !== null && (
          <GameResult
            place={gameData.place}
            professions={gameData.professions}
          />
        )}
      </div>
    </div>
  );
}
