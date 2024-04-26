import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff, MdWarningAmber } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { loginService } from "../../services/api";

export function LoginPage() {
  const navigate = useNavigate();

  const { username, login } = useAuth();

  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (inputUsername === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const res = await loginService(inputUsername, password);

      const { token, username, id } = res;

      if (token && username && id) {
        login(username, token, id);
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      try {
        if (error.response.data.message) {
          setError(error.response.data.message);
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (username !== null) {
      navigate(`/`, { replace: true });
    }
  }, [username]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <p>Insira seus dados</p>

        <div className="inputContainer">
          <input
            className="input"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Nome de usuário"
          />
        </div>

        <div className="inputContainer">
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <MdVisibility
              className="viewButton icon"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <MdVisibilityOff
              className="viewButton icon"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
            />
          )}
        </div>

        <button className="loginButton" type="submit">
          Entrar
        </button>

        {error === "" ? (
          <></>
        ) : (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <MdWarningAmber />
          </div>
        )}
      </form>
    </div>
  );
}
