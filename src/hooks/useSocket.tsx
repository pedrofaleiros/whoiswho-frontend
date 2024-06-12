import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { GameModel, ProfessionModel } from "../models/GameModel";
import { PlayerModel } from "../models/PlayerModel";

import { SocketConst } from "../utils/SocketConst";
import { useAuth } from "../contexts/AuthContext";
import socket from "../socket";

export const useSocket = () => {
  const { room } = useParams();
  const { userId, session } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [admId, setAdmId] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<string>("idle");
  const [category, setCategory] = useState<string | null>(null);
  const [impostors, setImpostors] = useState<number>(0);
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [gameData, setGameData] = useState<GameModel | null>(null);
  const [count, setCount] = useState<string>("");

  const handleSetImpostors = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    socket.emit(SocketConst.SET_IMPOSTORS, {
      userId: userId,
      roomCode: room,
      num: impostors === 1 ? 2 : impostors === 2 ? 3 : 1,
    });
  };

  const handleSetCategory = (
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

  const handleRemovePlayer = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault();
    socket.emit("removePlayer", {
      userId: userId,
      roomCode: room,
      removeId: id,
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

  useEffect(() => {
    if (room === undefined) {
      toast.warning("Faça login para entrar na sala");
      navigate("/", { replace: true });
      return;
    }

    const userData = session();

    socket.connect();

    socket.on("connect", () => {
      socket.emit(SocketConst.JOIN_ROOM, {
        roomCode: room,
        userId: userData?.userId,
      });
    });

    socket.on(SocketConst.GAME_IMPOSTORS, (data) => {
      if (typeof data === "number") setImpostors(data);
    });

    socket.on(SocketConst.GAME_CATEGORY, (data) => {
      if (typeof data === "string" || data === null) setCategory(data);
    });

    socket.on(SocketConst.GAME_STATUS, (data) => {
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
      if (typeof data === "string") setGameStatus(data);
    });

    socket.on(SocketConst.GAME_PLAYERS, (data) => {
      try {
        const players = data["players"] as PlayerModel[];
        if (typeof data["admId"] === "string") {
          setAdmId(data["admId"]);
        }
        setPlayers(players);
      } catch (error) {}
    });

    socket.on(SocketConst.ERROR, (data) => {
      if (typeof data === "string") {
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
      if (typeof data === "string") {
        toast.warning(data, { position: "bottom-right" });
      }
    });

    socket.on("count", (data) => {
      if (typeof data === "string") setCount(data);
    });

    socket.on("disconnect", () => {
      navigate("/", { replace: true });
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [room, userId, session, navigate]);

  return {
    loading,
    admId,
    gameStatus,
    category,
    impostors,
    players,
    gameData,
    count,
    handleSetImpostors,
    handleSetCategory,
    handleStartGame,
    handleFinishGame,
    handleBackClick,
    handleRemovePlayer,
  };
};
