import { ReactNode, HTMLAttributes } from "react";

type ListTileProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  borderColor?: string;
  textColor?: string;
};

export function ListTile({
  title,
  leading,
  trailing,
  borderColor = "border-white",
  textColor = "text-white",
  ...props
}: ListTileProps) {
  return (
    <div
      className={`flex flex-row w-full max-w-md items-center justify-between p-2 border-2 rounded-lg font-medium text-base ${borderColor} ${textColor} ${
        props.className ?? ""
      }`}
      {...props}
    >
      {leading && <div className="pr-2">{leading}</div>}
      {title && <div className="w-full">{title}</div>}
      {trailing && (
        <div className="pl-2 w-full flex flex-row justify-end">{trailing}</div>
      )}
    </div>
  );
}
