import { ReactComponent as Impostor } from "../../icons/impostor.svg";
import { MdAdd, MdRemove } from "react-icons/md";
import { IconButton } from "../common/Buttons";
import { TextTitle } from "../common/Texts";

// interface ImpostorsListProps {
//   impostors: number;
// }

// function ImpostorsList({ impostors }: ImpostorsListProps) {
//   return (
//     <div className="">
//       <h6 className="text-lg text-gray-400 font-semibold">Impostores</h6>
//       <ul className="flex flex-row justify-center gap-4">
//         {Array.from({ length: impostors }, (_, index) => (
//           <Impostor className="h-12 w-12" key={index} />
//         ))}
//       </ul>
//     </div>
//   );
// }
interface ImpostorsListProps {
  impostors: number;
  isAdm?: boolean;
  handle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // handleAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // handleRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
