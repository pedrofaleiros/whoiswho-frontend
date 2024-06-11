import { GameModel } from "../../models/GameModel";
import { ListTile } from "../common/ListTile";
import { AppIcon, AppIconSM } from "../common/Logo";
import {  TextTitle } from "../common/Texts";

export default function GameResult({ place, professions }: GameModel) {
  return (
    <div className="flex flex-col">
      <TextTitle text="Resultado" />
      <div className="w-full h-2"></div>

      <p className="px-4 py-2 text-center border-2 border-blue-500 rounded-lg items-center text-gray-300 font-medium text-xl">
        {place}
      </p>

      <div className="w-full h-2"></div>
      <ul className="flex flex-col gap-2">
        {professions.map((p) => {
          const isImp = p.isImpostor;
          return (
            <li key={p.playerId}>
              <ListTile
                title={p.username}
                trailing={isImp ? <AppIconSM /> : p.profession}
                borderColor={isImp ? "border-red-900" : "border-blue-900"}
                textColor={isImp ? "text-red-100" : "text-blue-100"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
