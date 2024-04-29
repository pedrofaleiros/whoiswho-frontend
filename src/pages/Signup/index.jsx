import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff, MdWarningAmber } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { signupService } from "../../services/api";
import { AuthAppBar } from "../../components/AuthAppBar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SignupPage() {
  const navigate = useNavigate();

  const { username, login } = useAuth();

  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (inputUsername === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== passwordConf) {
      setError("Confirme sua senha");
      return;
    }

    setLoading(true);

    try {
      const res = await signupService(inputUsername, password);

      const { token, username, id } = res;

      if (token && username && id) {
        login(username, token, id);
        setLoading(false);
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      setLoading(false);
      try {
        if (error.response.data.message) {
          setError(error.response.data.message);
        }
      } catch (error) {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username !== null) {
      navigate(`/`, { replace: true });
    }
  }, [username, navigate]);

  return (
    <div>
      <AuthAppBar />
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="auxText">Criar uma conta</h3>

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

        <div className="inputContainer">
          <input
            className="input"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            placeholder="Confirme sua senha"
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

        <button className="signupButton" type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters className="loading" />
          ) : (
            "Cadastrar"
          )}
        </button>

        {error === "" ? (
          <></>
        ) : (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <MdWarningAmber />
          </div>
        )}

        <div className="dividerLogin">
          <div className="solid"></div>
          <p>ou</p>
          <div className="solid"></div>
        </div>
      </form>

      <div className="signupContainer">
        <Link className="signupLink" to="/login">
          Já tenho uma conta
        </Link>
      </div>
    </div>
  );
}
