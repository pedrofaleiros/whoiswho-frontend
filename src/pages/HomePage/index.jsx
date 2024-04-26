import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { sessionService } from "../../services/api";
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

  return (
    <div>
      <HomeAppBar />
      <form className="codeForm" onSubmit={handleSubmit}>
        <p>Insira seus dados</p>

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
      </form>
    </div>
  );
}
