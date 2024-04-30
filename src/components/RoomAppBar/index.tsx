import { MdArrowBack } from "react-icons/md";
import "./styles.css";

interface RoomAppBarProps {
  roomCode: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function RoomAppBar({ roomCode, handleClick }: RoomAppBarProps) {
  return (
    <div className="roomAppBar">
      <button className="backButton" onClick={handleClick}>
        <MdArrowBack className="backIcon" />
      </button>
      <p className="roomCode">{`Sala ${roomCode}`}</p>
    </div>
  );
}
