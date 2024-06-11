import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { TextTitle } from "../common/Texts";

interface ImpostorsListProps {
  impostors: number;
  isAdm?: boolean;
  handle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ImpostorsList({
  impostors,
  isAdm = false,
  handle,
}: ImpostorsListProps) {
  return (
    <button
      onClick={
        isAdm
          ? (e: React.MouseEvent<HTMLButtonElement>) => {
              handle(e);
            }
          : (e) => {}
      }
      className={`w-full max-w-md flex flex-row rounded-lg bg-gray-900 justify-between items-center p-2 ${
        isAdm ? "hover:bg-gray-800" : "cursor-default"
      }`}
    >
      <TextTitle text="Impostores" />
      <ul className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          {Array.from({ length: impostors }, (_, index) => (
            <Impostor className="size-7" key={index} />
          ))}
        </div>
      </ul>
    </button>
  );
}

export { ImpostorsList };
