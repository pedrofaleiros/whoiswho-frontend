import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff, MdWarningAmber } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";
import { signupService } from "../../services/auth";
import { AuthAppBar } from "../../components/AuthAppBar";
import { FiLoader } from "react-icons/fi";
import axios from "axios";

export function SignupPage() {
  const navigate = useNavigate();

  const { username, login } = useAuth();

  const [inputUsername, setInputUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (inputUsername === "" || password === "") {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== passwordConf) {
      setError("As senhas estão diferentes");
      return;
    }

    setLoading(true);

    try {
      const res = await signupService({
        username: inputUsername.trim(),
        password: password,
      });

      const { token, username, id } = res;

      if (token && username && id) {
        login({
          token: token,
          userId: id,
          username: username,
        });
        setLoading(false);
        navigate(`/`, { replace: true });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error && error.response && error.response.data) {
          setError(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    if (username !== null) navigate(`/`, { replace: true });
  }, [username, navigate]);

  return (
    <div className="w-full justify-center flex flex-col text-center items-center">
      <AuthAppBar />

      <form
        onSubmit={handleSubmit}
        className="px-6 max-w-x bg-gray-100 mt-4 border-t-8 border-indigo-700 text-start rounded-lg flex flex-col"
      >
        <h1 className="my-4 font-medium text-2xl text-center text-gray-900">
          Criar uma conta
        </h1>

        <input
          className="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-600 focus:bg-white text-gray-700 font-mono pr-16 "
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="Nome de usuário"
        />

        <div className="mt-2 relative w-full">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input className="hidden js-password-toggle" />
            {showPassword ? (
              <MdVisibility
                className="h-6 w-6 text-gray-400 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <MdVisibilityOff
                className="h-6 w-6 text-gray-400 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </div>
          <input
            className="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-600 focus:bg-white text-gray-700 pr-16 font-mono js-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </div>

        <div className="mt-2 relative w-full">
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <input className="hidden js-password-toggle" />
            {showPassword ? (
              <MdVisibility
                className="h-6 w-6 text-gray-400 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <MdVisibilityOff
                className="h-6 w-6 text-gray-400 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            )}
          </div>
          <input
            className="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-600 focus:bg-white text-gray-700 pr-16 font-mono js-password"
            type={showPassword ? "text" : "password"}
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            placeholder="Confirme sua senha"
          />
        </div>

        <button
          className="my-4 w-full bg-indigo-600 items-center flex justify-center hover:bg-indigo-500  text-white font-medium py-3 rounded-lg focus:outline-none focus:shadow-outline "
          type="submit"
        >
          {loading ? <FiLoader className="animate-spin size-6" /> : "Cadastrar"}
        </button>

        {error !== null && error !== "" && (
          <div className="mb-3 flex flex-row items-center justify-center text-red-500  font-medium gap-2 text-sm">
            <p className="">{error}</p>
            <MdWarningAmber />
          </div>
        )}
      </form>

      <div className="my-6 w-full text-center justify-center flex flex-col items-center gap-3">
        <div className="flex flex-row items-center gap-4 ">
          <hr className="h-[0.5px]  w-24 bg-gray-400 mt-1 border-none" />
          <p className="text-gray-400 text-sm font-medium">ou</p>
          <hr className="h-[0.5px]  w-24 bg-gray-400 mt-1 border-none" />
        </div>

        <Link
          className="text-indigo-600 font-medium hover:text-indigo-500"
          to="/login"
        >
          Já tenho uma conta
        </Link>
      </div>
    </div>
  );
}
