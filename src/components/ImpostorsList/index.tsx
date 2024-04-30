import "./styles.css";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { MdAdd, MdRemove } from "react-icons/md";

interface ImpostorsListProps {
  impostors: number;
}

interface ImpostorsListADMProps {
  impostors: number;
  handleAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ImpostorsList({ impostors }: ImpostorsListProps) {
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

function ImpostorsListADM({
  impostors,
  handleAdd,
  handleRemove,
}: ImpostorsListADMProps) {
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
