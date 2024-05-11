import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { AppLogo } from "../common/Logo";

import { FiLoader } from "react-icons/fi";

export function HomeAppBar() {
  const { username, isLoading } = useAuth();

  return (
    <div className="w-full flex flex-row items-center justify-between p-3  shadow-sm shadow-gray-700">
      <Link to="/">
        <AppLogo />
      </Link>

      {isLoading && <FiLoader className="animate-spin size-6" />}

      {!isLoading && username === null && (
        <Link
          className="border-[1px] flex items-center rounded-md px-2 py-1 border-gray-500 shadow-sm shadow-gray-700 font-medium text-base hover:bg-gray-900"
          to="/login"
        >
          Entrar
        </Link>
      )}

      {!isLoading && username !== null && (
        <Link to="/profile">
          <p className="text-lg font-bold text-blue-500 hover:text-blue-400">
            {username}
          </p>
        </Link>
      )}
    </div>
  );
}
