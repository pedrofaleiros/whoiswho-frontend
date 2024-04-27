import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";

import socket from "../../socket";
import Cookies from "js-cookie";

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

export function RoomPage() {
  const { room } = useParams();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [impostors, setImpostors] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");
  const [players, setPlayers] = useState([]);
  const [admId, setAdmId] = useState("");

  const [count, setCount] = useState("");
  const [isImpostor, setIsImpostor] = useState(false);
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const _token = Cookies.get("@whoiswho.token");
    const _userId = Cookies.get("@whoiswho.userId");

    if (_token && _userId) {
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
      setTimeout(() => {
        setLoading(false);
      }, 100);

      try {
        setGameStatus(data);
      } catch (error) {}
    });

    socket.on(SocketConst.GAME_PLAYERS, (data) => {
      try {
        setAdmId(data["admId"]);
        const list = data["players"].map((p) => {
          return {
            id: p["id"],
            username: p["username"],
          };
        });
        setPlayers(list);
      } catch (error) {}
    });

    socket.on(SocketConst.DISCONNECT_ERROR, (data) => {
      if (data) {
        toast.warning(data);
      }
    });

    socket.on(SocketConst.GAME_DATA, (data) => {
      try {
        const list = data["professions"].map((p) => {
          if (p["playerId"] === userId) {
            setIsImpostor(p["isImpostor"]);
          }
          return {
            username: p["username"],
            playerId: p["playerId"],
            isImpostor: p["isImpostor"],
            profession: p["profession"],
          };
        });
        setGameData({
          place: data["place"],
          professions: list,
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

  const addImpostor = (event) => {
    event.preventDefault();

    if (impostors >= 3) return;

    socket.emit(SocketConst.SET_IMPOSTORS, {
      token: token,
      roomCode: room,
      num: impostors + 1,
    });
  };

  const removeImpostor = (event) => {
    event.preventDefault();

    if (impostors <= 1) return;

    socket.emit(SocketConst.SET_IMPOSTORS, {
      token: token,
      roomCode: room,
      num: impostors - 1,
    });
  };

  const handleStartGame = (event) => {
    event.preventDefault();

    socket.emit(SocketConst.START_GAME, {
      token: token,
    });
  };

  const handleFinishGame = (event) => {
    event.preventDefault();

    socket.emit(SocketConst.FINISH_GAME, {
      token: token,
    });
  };

  const handleBackClick = (event) => {
    event.preventDefault();
    socket.disconnect();
  };

  if (loading) {
    return (
      <div className="loadingPage">
        <RoomAppBar handleClick={handleBackClick} roomCode={room} />
        <AiOutlineLoading3Quarters className="spinner" />
      </div>
    );
  }

  if (gameStatus === "playing") {
    return (
      <>
        <RoomAppBar handleClick={handleBackClick} roomCode={room} />
        {gameData !== null && (
          <PlayingRoom
            admId={admId}
            isImpostor={isImpostor}
            place={gameData.place}
            professions={gameData.professions}
            userId={userId}
            handleFinishGame={handleFinishGame}
          />
        )}
      </>
    );
  }

  return (
    <div className="roomContainer">
      <RoomAppBar handleClick={handleBackClick} roomCode={room} />

      {count !== "" && (
        <div className="overlay">
          <p className="count">{count}</p>
        </div>
      )}

      <PlayersList players={players} admId={admId} userId={userId} />

      {admId === userId ? (
        <ImpostorsListADM
          impostors={impostors}
          handleAdd={addImpostor}
          handleRemove={removeImpostor}
        />
      ) : (
        <ImpostorsList impostors={impostors} />
      )}

      {gameStatus === "finished" && gameData !== null && (
        <>
          <GameResult
            place={gameData.place}
            professions={gameData.professions}
          />
        </>
      )}

      {admId === userId && (
        <button className="startButton" onClick={handleStartGame}>
          Iniciar partida
        </button>
      )}
    </div>
  );
}
