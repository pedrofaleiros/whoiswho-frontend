import { useParams } from "react-router-dom";

import { CategoriesADM, GameCategory } from "../../components/GameCategory";
import { ImpostorsList } from "../../components/ImpostorsList";
import { PlayingRoom } from "../../components/PlayingRoom";
import { TextButton } from "../../components/common/Buttons";
import { Divider } from "../../components/common/Divider";
import PlayersList from "../../components/PlayersList";
import GameResult from "../../components/GameResult";
import RoomAppBar from "../../components/RoomAppBar";
import { MdPlayArrow } from "react-icons/md";
import { FiLoader } from "react-icons/fi";

import { useAuth } from "../../contexts/AuthContext";
import { useCategories } from "../../hooks/useCategories";
import { useSocket } from "../../hooks/useSocket";

export function RoomPage() {
  const { room } = useParams();
  const { userId } = useAuth();
  const { categories } = useCategories();

  const {
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
  } = useSocket();

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <RoomAppBar handleClick={handleBackClick} roomCode={room ?? ""} />
        <FiLoader className="animate-spin size-8 mt-16" />
      </div>
    );
  }

  if (gameStatus === "playing") {
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
            userId={userId ?? ""}
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
            handle={handleSetCategory}
          />
        )}

        {admId === userId && <Divider />}

        <ImpostorsList
          impostors={impostors}
          isAdm={admId === userId}
          handle={handleSetImpostors}
        />

        <Divider />

        <PlayersList players={players} admId={admId} userId={userId ?? ""} />

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
