import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { createRoomService, sessionService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

import "./styles.css";
import { HomeAppBar } from "../../components/HomeAppBar";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const session = async () => {
      const _token = Cookies.get("@whoiswho.token");
      if (_token) {
        try {
          const response = await sessionService(_token);
          const { token, username, id } = response;

          login(username, token, id);
        } catch (error) {}
      }
    };

    session();
  }, [login]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (roomCode.length !== 4) {
      toast.warning("Código da sala inválido");
      return;
    }

    const token = Cookies.get("@whoiswho.token");
    if (!token) {
      toast.warning("Faça login para entrar em uma sala");
      return;
    }

    navigate(`/room/${roomCode}`);
  };

  const handleCreateRoom = async (event) => {
    event.preventDefault();

    const token = Cookies.get("@whoiswho.token");
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
