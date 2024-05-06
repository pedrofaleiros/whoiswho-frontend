interface TextTitleProps {
  text: string;
}

export function TextTitle({ text }: TextTitleProps) {
  return (
    <div className=" w-full text-left max-w-xs font-semibold text-lg font-sans text-gray-400">
      {text}
    </div>
  );
}
