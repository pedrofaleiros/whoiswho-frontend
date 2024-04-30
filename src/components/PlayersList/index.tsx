import { PlayerModel } from "../../models/PlayerModel";
import "./styles.css";

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
    <>
      <h6 className="playersTitle">Jogadores</h6>
      <ul className="playersList">
        {players.map((p) => {
          if (p.id === admId) {
            return (
              <li className="playerListItem adm" key={p.id}>
                <p>{`${p.username}`}</p>
                <p>(ADM)</p>
              </li>
            );
          }

          return (
            <li className="playerListItem" key={p.id}>
              {`${p.username} ${p.id === userId ? "(Você)" : ""}`}
            </li>
          );
        })}
      </ul>
    </>
  );
}
