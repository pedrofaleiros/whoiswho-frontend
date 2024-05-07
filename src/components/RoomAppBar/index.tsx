import { MdArrowBack } from "react-icons/md";
import { IconButton } from "../common/Buttons";
import { AppBarTitle } from "../common/Texts";
import { ReactNode } from "react";

interface RoomAppBarProps {
  roomCode: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  action?: ReactNode;
}

export default function RoomAppBar({
  roomCode,
  handleClick,
  action = <div></div>,
}: RoomAppBarProps) {
  return (
    <div className="w-full items-center p-3 flex gap-2 flex-row justify-between shadow-sm shadow-gray-700">
      <IconButton hideBorder={true} onClick={handleClick}>
        {<MdArrowBack className="text-red-600" />}
      </IconButton>

      <AppBarTitle text={`Sala ${roomCode}`} />

      <div>{action}</div>
    </div>
  );
}
