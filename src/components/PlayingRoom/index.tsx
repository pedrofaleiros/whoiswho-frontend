import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { GameModel } from "../../models/GameModel";

import "./styles.css";

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
  return (
    <div className="playingContainer">
      {admId === userId && (
        <button className="finishButton" onClick={handleFinishGame}>
          Finalizar partida
        </button>
      )}
      {game.professions.map((p) => {
        if (p.playerId === userId) {
          if (p.isImpostor) {
            return (
              <div key={p.playerId} className="impostorContainer">
                <h4>Você é um impostor</h4>
                <Impostor />
              </div>
            );
          }

          return (
            <div key={p.playerId} className="notImpostorContainer">
              <h6 className="title">Local</h6>
              <p className="playingPlace playingText">{game.place}</p>
              <h6 className="title">Profissão</h6>
              <p className="playingProfession playingText">{p.profession}</p>
            </div>
          );
        }
        return <></>;
      })}
    </div>
  );
}
