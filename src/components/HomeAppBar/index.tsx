import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";

export function HomeAppBar() {
  const { username } = useAuth();

  return (
    <div className=" flex flex-row  justify-between p-3 bg-gray-950 items-center">
      <div className="flex flex-row items-center ">
        <Impostor className=" h-8 w-8" />
        <h1 className="text-red-700 font-bold text-2xl ">WhoIsWho</h1>
      </div>

      {username === null && (
        <Link className="text-blue-700 hover:text-blue-400 " to="/login">
          Entrar
        </Link>
      )}

      {username !== null && (
        <Link to="/profile">
          <p className=" text-lg text-blue-700 hover:text-blue-400 font-bold">
            {username}
          </p>
        </Link>
      )}
    </div>
  );
}
