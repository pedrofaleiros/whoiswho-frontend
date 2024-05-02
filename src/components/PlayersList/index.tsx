import { PlayerModel } from "../../models/PlayerModel";

interface PlayersListProps {
  players: PlayerModel[];
  admId: string;
  userId: string;
}

export default function PlayersList({
  players,
  admId,
  userId,
}: PlayersListProps) {
  return (
    <div className="m-4 flex flex-col">
      <h6 className="text-lg text-gray-400 font-semibold">Jogadores</h6>
      <ul className="w-full">
        {players.map((p) => {
          if (p.id === admId) {
            return (
              <li
                className="mt-2 flex flex-row justify-between border-2 rounded-lg px-4 py-2 border-blue-300 "
                key={p.id}
              >
                <p>{`${p.username}`}</p>
                <p>(ADM)</p>
              </li>
            );
          }

          return (
            <li
              className="mt-2 flex flex-row border-2 rounded-lg px-4 py-2 border-gray-500 "
              key={p.id}
            >
              {`${p.username} ${p.id === userId ? "(Você)" : ""}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
