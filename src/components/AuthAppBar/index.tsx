import { Link } from "react-router-dom";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";

export function AuthAppBar() {
  return (
    <div className="flex flex-row w-full p-4 justify-center">
      <Link to="/" replace={true}>
        <div className="flex flex-row items-end gap-2">
          <Impostor className="h-12 w-12" />
          <h1 className="text-4xl text-red-700 font-bold ">WhoIsWho</h1>
        </div>
      </Link>
    </div>
  );
}
