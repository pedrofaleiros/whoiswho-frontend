import { ButtonHTMLAttributes } from "react";

const defaultConfig: string =
  " w-full p-2 rounded-md max-w-xs font-semibold text-base font-mono";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export function PrimaryButton({ text, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`${defaultConfig} bg-blue-700 hover:brightness-125  ${
        props.className ?? ""
      }`}
    >
      {text}
    </button>
  );
}

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export function SecondaryButton({ text, ...props }: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`${defaultConfig} bg-gray-950 border-2 border-blue-500 text-blue-500  hover:bg-gray-900   ${
        props.className ?? ""
      }`}
    >
      {text}
    </button>
  );
}

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export function TextButton({ text, ...props }: TextButtonProps) {
  return (
    <button
      {...props}
      className={`${defaultConfig} flex flex-row items-center justify-center gap-2 bg-inherit text-green-500  hover:bg-gray-900 ${
        props.className ?? ""
      }`}
    >
      {text}
      {props.children}
    </button>
  );
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hideBorder?: boolean;
};

export function IconButton({ hideBorder = false, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={`p-2 rounded-xl text-2xl w-min bg-inheritborder-white text-white hover:bg-gray-900 ${
        hideBorder ? "" : "border-2"
      } ${props.className ?? ""}`}
    >
      {props.children}
    </button>
  );
}
