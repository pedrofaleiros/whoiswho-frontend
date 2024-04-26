import "./styles.css";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { MdAdd, MdRemove } from "react-icons/md";

function ImpostorsList({ impostors }) {
  return (
    <>
      <h6 className="impostorsTitle">Impostores</h6>
      <ul className="impostorsList">
        {Array.from({ length: impostors }, (_, index) => (
          <Impostor className="impostorIcon" key={index} />
        ))}
      </ul>
    </>
  );
}

function ImpostorsListADM({ impostors, handleAdd, handleRemove }) {
  return (
    <>
      <h6 className="impostorsTitle">Impostores</h6>
      <ul className="impostorsList">
        <button className="setImpostorButton" onClick={handleRemove}>
          <MdRemove />
        </button>
        {Array.from({ length: impostors }, (_, index) => (
          <Impostor className="impostorIcon" key={index} />
        ))}
        <button className="setImpostorButton" onClick={handleAdd}>
          <MdAdd />
        </button>
      </ul>
    </>
  );
}

export { ImpostorsList, ImpostorsListADM };
