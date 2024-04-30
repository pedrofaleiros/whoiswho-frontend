import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { createRoomService, sessionService } from "../../services/api";
import { HomeAppBar } from "../../components/HomeAppBar";

import "./styles.css";
import { parseCookies } from "nookies";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState<string>("");

  const { login, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const session = async () => {
      const _token = parseCookies()["@whoiswho.token"];

      if (_token) {
        try {
          const response = await sessionService(_token);
          const { token, username, id } = response;

          login({
            token: token,
            userId: id,
            username: username,
          });
        } catch (error) {
          logout();
        }
      }
    };

    session();
  }, [login, logout]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (roomCode.length !== 4) {
      toast.warning("Código da sala inválido");
      return;
    }

    const token = parseCookies()["@whoiswho.token"];
    if (!token) {
      toast.warning("Faça login para entrar em uma sala");
      return;
    }

    navigate(`/room/${roomCode}`);
  };

  const handleCreateRoom = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const token = parseCookies()["@whoiswho.token"];
    if (!token) {
      toast.warning("Faça login para criar uma sala");
      return;
    }
    try {
      const response = await createRoomService(token);
      const roomCode = response.roomCode;

      navigate(`/room/${roomCode}`);
    } catch (error) {}
  };

  return (
    <div className="homeContainer">
      <HomeAppBar />
      <form className="codeForm" onSubmit={handleSubmit}>
        <p className="enterTitle">Entrar em uma sala</p>

        <input
          type="number"
          className="codeInput"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Código"
        />

        <button className="joinButton" type="submit">
          Entrar
        </button>

        <div className="divider">
          <div className="solid"></div>
          <p>ou</p>
          <div className="solid"></div>
        </div>
      </form>

      <div className="createContainer">
        <button onClick={handleCreateRoom} className="createButton">
          Criar uma sala
        </button>
      </div>
    </div>
  );
}
