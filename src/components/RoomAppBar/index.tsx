import { MdArrowBack } from "react-icons/md";

interface RoomAppBarProps {
  roomCode: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RoomAppBar({ roomCode, handleClick }: RoomAppBarProps) {
  return (
    <div className="p-3 flex flex-row text-red-700 bg-gray-950 justify-between">
      <button className="hover:text-red-500" onClick={handleClick}>
        <MdArrowBack className="size-7" />
      </button>
      <p className="font-medium text-2xl">{`Sala ${roomCode}`}</p>
      <div className="size-7"></div>
    </div>
  );
}
