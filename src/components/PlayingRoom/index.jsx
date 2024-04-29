import { ReactComponent as Impostor } from "../../icons/impostor.svg";

import "./styles.css";

export function PlayingRoom({
  isImpostor,
  place,
  professions,
  userId,
  admId,
  handleFinishGame,
}) {
  return (
    <div className="playingContainer">
      {admId === userId && (
        <button className="finishButton" onClick={handleFinishGame}>
          Finalizar partida
        </button>
      )}
      {professions.map((p) => {
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
              <p className="playingPlace playingText">{place}</p>
              <h6 className="title">Profissão</h6>
              <p className="playingProfession playingText">{p.profession}</p>
            </div>
          );
        }
      })}
    </div>
  );
}
