import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { MdAdd, MdRemove } from "react-icons/md";
import { IconButton } from "../common/Buttons";

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
    <div className="m-4">
      <h6 className="text-lg text-gray-400 font-semibold">Impostores</h6>
      <ul className="flex flex-row justify-center gap-4">
        {Array.from({ length: impostors }, (_, index) => (
          <Impostor className="h-12 w-12" key={index} />
        ))}
      </ul>
    </div>
  );
}

function ImpostorsListADM({
  impostors,
  handleAdd,
  handleRemove,
}: ImpostorsListADMProps) {
  return (
    <div className="m-4">
      <h6 className="text-lg text-gray-400 font-semibold">Impostores</h6>
      <ul className="my-4 flex flex-row justify-between">
        <IconButton onClick={handleRemove} children={<MdRemove />} />

        <div className="flex flex-row gap-4">
          {Array.from({ length: impostors }, (_, index) => (
            <Impostor className="h-12 w-12" key={index} />
          ))}
        </div>

        <IconButton onClick={handleAdd} children={<MdAdd />} />
      </ul>
    </div>
  );
}

export { ImpostorsList, ImpostorsListADM };
