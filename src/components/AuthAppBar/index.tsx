import { Link } from "react-router-dom";

import { ReactComponent as Impostor } from "../../icons/impostor.svg";

export function AuthAppBar() {
  return (
    <div className="flex flex-row w-full p-4 justify-between">
      <Link className="" to="/" replace={true}>
        <div className="flex flex-row">
          <Impostor className="h-8 w-8" />
          <h1 className="text-red-700 font-bold text-2xl">WhoIsWho</h1>
        </div>
      </Link>
    </div>
  );
}
