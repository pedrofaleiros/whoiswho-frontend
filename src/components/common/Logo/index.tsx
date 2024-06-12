import { ReactComponent as Impostor } from "../../../icons/impostor.svg";

export function AppLogo() {
  return (
    <div className="w-min flex flex-row items-end gap-1">
      <Impostor className="size-8" />
      <h1 className="text-red-700 font-bold font-mono text-xl">WhoIsWho</h1>
    </div>
  );
}

export function AppIcon() {
  return <Impostor className="size-10" />;
}

export function AppIconSM() {
  return <Impostor className="size-8" />;
}
