import { MdRemove } from "react-icons/md";
import { PlayerModel } from "../../models/PlayerModel";
import { ListTile } from "../common/ListTile";
import { TextTitle } from "../common/Texts";

interface PlayersListProps {
  players: PlayerModel[];
  admId: string;
  userId: string;
  handleRemove: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => void;
}

export default function PlayersList({
  players,
  admId,
  userId,
  handleRemove,
}: PlayersListProps) {
  return (
    <div className="flex flex-col w-full">
      <TextTitle text="Jogadores" />
      <div className="w-full h-2"></div>
      <ul className="flex flex-col gap-2">
        {players.map((p) => {
          const isAdm = p.id === admId;
          return (
            <li key={p.id}>
              <ListTile
                title={`${p.username} ${p.id === userId ? "(Você)" : ""}`}
                trailing={
                  isAdm ? (
                    "ADM"
                  ) : userId === admId ? (
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        handleRemove(e, p.id);
                      }}
                    >
                      <MdRemove />
                    </button>
                  ) : (
                    ""
                  )
                }
                borderColor={isAdm ? "border-blue-500" : "border-gray-600"}
                textColor={isAdm ? "text-blue-100" : ""}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
