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

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { parseCookies } from "nookies";
import { PlayerModel } from "../../models/PlayerModel";
import { GameModel, ProfessionModel } from "../../models/GameModel";

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
      <div className="loadingPage">
        <RoomAppBar handleClick={handleBackClick} roomCode={room ?? ""} />
        <AiOutlineLoading3Quarters className="spinner" />
      </div>
    );
  }

  if (gameStatus === "playing" && gameData !== null) {
    return (
      <>
        <RoomAppBar handleClick={handleBackClick} roomCode={room ?? ""} />
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
    <div className="  text-gray-300 overflow-hidden ">
      <RoomAppBar handleClick={handleBackClick} roomCode={room ?? ""} />

      {count !== "" && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-black text-center">
          <p className="bg-gray-300 mx-8 mt-48 rounded-lg py-8 px-2 text-gray-900 font-bold text-xl">
            {count}
          </p>
        </div>
      )}

      {admId === userId && (
        <div className="text-center w-full pt-4 px-4">
          <button
            className="font-sans border-2 border-blue-500 w-full max-w-96 py-2 rounded-xl text-blue-500 font-medium text-xl hover:bg-gray-900"
            onClick={handleStartGame}
          >
            Iniciar partida
          </button>
        </div>
      )}

      <PlayersList players={players} admId={admId} userId={userId} />

      <hr className="mt-8 mx-4 h-0.5 border-t-0 bg-gray-800" />

      {admId === userId && (
        <ImpostorsListADM
          impostors={impostors}
          handleAdd={addImpostor}
          handleRemove={removeImpostor}
        />
      )}

      {admId !== userId && <ImpostorsList impostors={impostors} />}

      <hr className="mt-8 mx-4 h-0.5 border-t-0 bg-gray-800" />

      {gameStatus === "finished" && gameData !== null && (
        <>
          <GameResult
            place={gameData.place}
            professions={gameData.professions}
          />
        </>
      )}
    </div>
  );
}
