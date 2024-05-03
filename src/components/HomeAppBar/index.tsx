import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";

export function HomeAppBar() {
  const { username } = useAuth();

  return (
    <div className="w-full flex flex-row items-center justify-between p-3">
      <div className="flex flex-row">
        <Impostor className=" h-8 w-8" />
        <h1 className="text-red-700 font-bold text-2xl">WhoIsWho</h1>
      </div>

      {username === null && (
        <Link
          className="border-[1px] flex items-center rounded-md px-2 py-1 border-gray-500 shadow-sm shadow-gray-700 font-medium text-base hover:bg-gray-900"
          to="/login"
        >
          Entrar
        </Link>
      )}

      {username !== null && (
        <Link to="/profile">
          <p className="text-lg font-bold text-blue-500 hover:text-blue-400">
            {username}
          </p>
        </Link>
      )}
    </div>
  );
}
