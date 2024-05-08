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
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdPlayArrow,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CategoryModel } from "../../models/CategoryModel";
import { getCategoriesService } from "../../services/api";
import { TextTitle } from "../../components/common/Texts";

export function RoomPage() {
  const { room } = useParams();
  const [token, setToken] = useState<string | null>(null);
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
      if (token !== null) {
        try {
          const data = await getCategoriesService(token);
          setCategories(data);
        } catch (error) {}
      }
    };

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

    getCategories();

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

  const setRoomCategory = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => {
    event.preventDefault();
    socket.emit(SocketConst.SET_CATEGORY, {
      token: token,
      roomCode: room,
      categoryId: id,
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
      <div className="px-4 py-4 w-full max-w-md ">
        {count !== "" && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-black text-center">
            <p className="bg-gray-300 mx-8 mt-48 rounded-lg py-8 px-2 text-gray-900 font-bold text-xl">
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

        <div className="my-4">
          <Divider />
        </div>

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

interface CategoriesADMProps {
  category: string | null;
  categories: CategoryModel[];
  handle: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => void;
}

function CategoriesADM({ category, categories, handle }: CategoriesADMProps) {
  return (
    <div className="flex flex-col">
      {categories.map((c) => {
        return (
          <button
            onClick={(e) => handle(e, c.name === category ? null : c.id)}
            key={c.id}
            className="flex flex-row items-center gap-1 w-full max-w-md cursor-pointer border-none hover:bg-gray-800 rounded-lg py-2"
          >
            {c.name === category ? (
              <MdCheckBox className="text-green-500 size-6 cursor-pointer" />
            ) : (
              <MdCheckBoxOutlineBlank className="size-6 cursor-pointer" />
            )}

            <p className="text-base">{c.name}</p>
          </button>
        );
      })}
    </div>
  );
}

function GameCategory({ category }: { category: string | null }) {
  return (
    <div>
      <TextTitle text="Categoria" />
      {category !== null && (
        <p className="w-full my-2 font-mono text-center text-2xl text-green-500 font-bold">
          {category}
        </p>
      )}
      {category === null && (
        <p className="text-gray-500 text-sm font-medium w-full text-center my-2">
          Nenhuma categoria selecionada
        </p>
      )}
    </div>
  );
}
