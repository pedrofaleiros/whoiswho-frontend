import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { GameModel } from "../../models/GameModel";

export default function GameResult({ place, professions }: GameModel) {
  return (
    <div className="m-4 flex flex-col">
      <h6 className="text-lg text-gray-400 font-semibold">Resultado</h6>
      {
        <p className="mt-2 px-4 py-2 text-center border-2 border-blue-500 rounded-xl items-center text-gray-300 font-medium text-xl">
          {place}
        </p>
      }
      {professions.map((p) => {
        if (p.isImpostor) {
          return (
            <div
              className="mt-2 px-4 py-2 flex flex-row justify-between border-2 border-red-500 rounded-lg items-center text-gray-300 font-medium"
              key={p.playerId}
            >
              <p>{`${p.username}: `}</p>
              <Impostor className="h-8 w-8" />
            </div>
          );
        }

        return (
          <div
            className="mt-2 px-4 py-2 flex flex-row justify-between border-2 border-blue-500 rounded-lg items-center text-gray-300 font-medium "
            key={p.playerId}
          >
            <p>{`${p.username}: `}</p>
            <p> {`${p.profession}`}</p>
          </div>
        );
      })}
    </div>
  );
}
