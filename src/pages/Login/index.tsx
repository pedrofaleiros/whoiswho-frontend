import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff, MdWarningAmber } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { loginService } from "../../services/auth";
import { AuthAppBar } from "../../components/AuthAppBar";
import axios from "axios";
import { FiLoader } from "react-icons/fi";

export function LoginPage() {
  const navigate = useNavigate();

  const { username, login } = useAuth();

  const [inputUsername, setInputUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);

    if (inputUsername === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const res = await loginService({
        username: inputUsername.trim(),
        password: password,
      });

      const { token, username, id } = res;

      if (token && username && id) {
        login({
          token: token,
          username: username,
          userId: id,
        });
        navigate(`/`, { replace: true });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error && error.response && error.response.data) {
          setError(error.response.data.message ?? "Erro no servidor.");
        }
      }
    }
  };

  useEffect(() => {
    if (!(username === null || username === ""))
      navigate(`/`, { replace: true });
  }, [username, navigate]);

  return (
    <div className="w-full flex flex-col items-center">
      <AuthAppBar />

      <form
        onSubmit={handleSubmit}
        className="w-2/3 max-w-xs text-center flex flex-col gap-2 mt-3"
      >
        <h1 className="text-2xl font-mono font-semibold">Fazer login</h1>

        <input
          className="appearance-none border-2 rounded-md w-full py-2 px-3 border-gray-500 bg-gray-900 focus:outline-none focus:border-gray-300 focus:bg-gray-800 hover:bg-gray-800 font-mono "
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Nome de usuário"
        />

        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input className="hidden js-password-toggle" id="toggle" />
            {showPassword ? (
              <MdVisibility
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <MdVisibilityOff
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </div>
          <input
            className="appearance-none border-2 rounded-md w-full py-2 px-3 border-gray-500 bg-gray-900 focus:outline-none focus:border-gray-300 focus:bg-gray-800 hover:bg-gray-800 font-mono js-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </div>

        <button
          className="bg-blue-700 rounded-md py-2 text-base font-medium hover:bg-blue-500 mt-2 flex justify-center"
          type="submit"
        >
          {loading ? <FiLoader className="animate-spin size-6" /> : "Entrar"}
        </button>

        {error !== null && (
          <div className="flex flex-row items-center justify-center text-red-500  font-medium gap-2 text-sm">
            <p className="">{error}</p>
            <MdWarningAmber />
          </div>
        )}
      </form>

      <div className="mt-6 w-full text-center justify-center flex flex-col items-center gap-6">
        <div className="flex flex-row items-center gap-4 ">
          <hr className="h-[0.5px]  w-24 bg-gray-400 mt-1 border-none" />
          <p className="text-gray-400 text-sm font-medium">ou</p>
          <hr className="h-[0.5px]  w-24 bg-gray-400 mt-1 border-none" />
        </div>

        <Link
          className="text-blue-600 font-medium hover:text-blue-500"
          to="/signup"
        >
          Criar uma conta
        </Link>
      </div>
    </div>
  );
}
