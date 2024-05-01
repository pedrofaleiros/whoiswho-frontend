import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { GameModel } from "../../models/GameModel";

interface PlayingRoomProps {
  userId: string;
  admId: string;
  game: GameModel;
  handleFinishGame: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function PlayingRoom({
  userId,
  admId,
  game,
  handleFinishGame,
}: PlayingRoomProps) {
  const index = game.professions.findIndex((p) => p.playerId === userId);

  if (index === -1) {
    return (
      <div>
        <p className="text-gray-400 text-center p-4 font-semibold text-xl">
          A partida já foi iniciada
        </p>
      </div>
    );
  }

  const player = game.professions[index];

  return (
    <div className="text-gray-200">
      {admId === userId && (
        <div className="text-center w-full p-4">
          <button
            className="border-2 border-blue-500 w-full max-w-96 py-2 rounded-full text-blue-500 font-medium text-xl hover:bg-gray-950"
            onClick={handleFinishGame}
          >
            Finalizar partida
          </button>
        </div>
      )}

      {player.isImpostor && (
        <div
          key={player.playerId}
          className="mt-8 gap-4 text-2xl text-red-700 text-center items-center flex flex-col font-semibold"
        >
          <p>Você é um impostor</p>
          <Impostor className=" h-32 w-32" />
        </div>
      )}

      {!player.isImpostor && (
        <div key={player.playerId} className="flex flex-col gap-2 m-4">
          <p className="text-lg text-gray-400 font-semibold">Local</p>
          <p className="border-2 border-blue-500 rounded-xl px-4 py-2 text-xl text-center font-medium ">
            {game.place}
          </p>
          <p className="mt-4 text-lg text-gray-400 font-semibold">Profissão</p>
          <p className="border-2 border-blue-500 rounded-xl px-4 py-2 text-xl text-center font-medium ">
            {player.profession}
          </p>
        </div>
      )}
    </div>
  );
}
