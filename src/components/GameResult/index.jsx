import "./styles.css";
import { ReactComponent as Impostor } from "../../icons/impostor.svg";

export default function GameResult({ place, professions }) {
  return (
    <div className="resultContainer">
      <h6 className="resultTitle">Resultado</h6>
      {<p className="resultPlace">{place ?? ""}</p>}
      {professions.map((p) => {
        if (p.isImpostor) {
          return (
            <div className="resultUser resultImpostor" key={p.playerId}>
              <p>{`${p.username}: `}</p>
              <Impostor className="resultImpostorIcon" />
            </div>
          );
        }
        return (
          <div className="resultUser" key={p.playerId}>
            <p>{`${p.username}: `}</p>
            <p> {`${p.profession}`}</p>
          </div>
        );
      })}
    </div>
  );
}
