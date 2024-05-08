export function OrDivider() {
  return (
    <div className="flex flex-row items-center gap-4 w-full max-w-xs">
      <hr className="h-[0.5px]  w-full bg-gray-500 mt-1 border-none" />
      <p className="text-gray-500 text-sm font-medium">ou</p>
      <hr className="h-[0.5px]  w-full bg-gray-500 mt-1 border-none" />
    </div>
  );
}

export function Divider() {
  return <hr className="w-full h-[1px] border-t-0 bg-gray-800" />;
}
