import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { GameModel } from "../../models/GameModel";
import { SecondaryButton } from "../common/Buttons";
import { TextTitle } from "../common/Texts";

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
    <div className="w-full flex flex-col items-center">
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
        <div key={player.playerId} className="p-2 w-full max-w-md">
          <div className="h-4 w-full"></div>
          <TextTitle text="Local" />
          <p className="border-2 border-blue-500 rounded-xl px-4 py-2 text-xl text-center font-medium ">
            {game.place}
          </p>
          <div className="h-4 w-full"></div>
          <TextTitle text="Profissão" />
          <p className="border-2 border-blue-500 rounded-xl px-4 py-2 text-xl text-center font-medium ">
            {player.profession}
          </p>
        </div>
      )}
    </div>
  );
}
