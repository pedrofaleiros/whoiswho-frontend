import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import socket from "../../socket";

import { SocketConst } from "../../utils/SocketConst";
import { toast } from "react-toastify";

import PlayersList from "../../components/PlayersList";
import GameResult from "../../components/GameResult";
import {
  ImpostorsList,
  ImpostorsListADM,
} from "../../components/ImpostorsList";
import { PlayingRoom } from "../../components/PlayingRoom";
import RoomAppBar from "../../components/RoomAppBar";

import { parseCookies } from "nookies";
import { PlayerModel } from "../../models/PlayerModel";
import { GameModel, ProfessionModel } from "../../models/GameModel";
import { TextButton } from "../../components/common/Buttons";
import { Divider } from "../../components/common/Divider";
import { MdPlayArrow } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function RoomPage() {
  const { room } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [gameStatus, setGameStatus] = useState<string>("idle");
  const [admId, setAdmId] = useState<string>("");

  const [impostors, setImpostors] = useState<number>(0);

  const [players, setPlayers] = useState<PlayerModel[]>([]);

  const [count, setCount] = useState<string>("");

  const [gameData, setGameData] = useState<GameModel | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const _token = cookies["@whoiswho.token"];
    const _userId = cookies["@whoiswho.userId"];

    if (_token && _userId && room !== undefined) {
      setToken(_token);
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
        token: token,
      });
    });

    socket.on(SocketConst.GAME_IMPOSTORS, (data) => {
      try {
        setImpostors(data);
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
        toast.warning(data);
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
        toast.warning(data);
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

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [room, token, userId, navigate]);

  const addImpostor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (impostors >= 3) return;

    socket.emit(SocketConst.SET_IMPOSTORS, {
      token: token,
      roomCode: room,
      num: impostors + 1,
    });
  };

  const removeImpostor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (impostors <= 1) return;

    socket.emit(SocketConst.SET_IMPOSTORS, {
      token: token,
      roomCode: room,
      num: impostors - 1,
    });
  };

  const handleStartGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.emit(SocketConst.START_GAME, { token: token });
  };

  const handleFinishGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.emit(SocketConst.FINISH_GAME, { token: token });
  };

  const handleBackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    socket.disconnect();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <RoomAppBar handleClick={handleBackClick} roomCode={room ?? ""} />
        <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 mt-16" />
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

      {/* CONTENT */}
      <div className="px-2 py-2 w-full max-w-md ">
        {count !== "" && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-black text-center">
            <p className="bg-gray-300 mx-8 mt-48 rounded-lg py-8 px-2 text-gray-900 font-bold text-xl">
              {count}
            </p>
          </div>
        )}

        <PlayersList players={players} admId={admId} userId={userId} />

        <div className="my-4">
          <Divider />
        </div>

        {admId === userId && (
          <ImpostorsListADM
            impostors={impostors}
            handleAdd={addImpostor}
            handleRemove={removeImpostor}
          />
        )}

        {admId !== userId && <ImpostorsList impostors={impostors} />}

        <div className="my-4">
          <Divider />
        </div>

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
