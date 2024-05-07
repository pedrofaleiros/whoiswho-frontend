interface TextTitleProps {
  text: string;
}

export function TextTitle({ text }: TextTitleProps) {
  return (
    <div className=" w-fit text-left font-semibold text-lg font-sans text-gray-400">
      {text}
    </div>
  );
}

export function AppBarTitle({ text }: { text: string }) {
  return (
    <div className="w-full font-semibold text-2xl font-sans text-red-600">
      {text}
    </div>
  );
}
