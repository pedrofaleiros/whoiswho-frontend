import { MdArrowBack } from "react-icons/md";
import "./styles.css";

export default function RoomAppBar({ roomCode, handleClick }) {
  return (
    <div className="roomAppBar">
      <button className="backButton" onClick={handleClick}>
        <MdArrowBack className="backIcon" />
      </button>
      <p className="roomCode">{`Sala ${roomCode}`}</p>
    </div>
  );
}
