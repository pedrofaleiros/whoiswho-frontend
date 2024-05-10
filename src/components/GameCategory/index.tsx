import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { TextTitle } from "../common/Texts";
import { CategoryModel } from "../../models/CategoryModel";

interface CategoriesADMProps {
  category: string | null;
  categories: CategoryModel[];
  handle: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => void;
}

export function CategoriesADM({
  category,
  categories,
  handle,
}: CategoriesADMProps) {
  return (
    <div className="flex flex-col">
      {categories.map((c) => {
        return (
          <button
            onClick={(e) => handle(e, c.name === category ? null : c.id)}
            key={c.id}
            className="flex flex-row justify-between items-center gap-1 w-full max-w-md cursor-pointer border-none hover:bg-gray-800 rounded-lg p-2"
          >
            <p className="text-base">{c.name}</p>
            {c.name === category ? (
              <MdCheckBox className="text-green-500 size-6 cursor-pointer" />
            ) : (
              <MdCheckBoxOutlineBlank className="size-6 cursor-pointer" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function GameCategory({ category }: { category: string | null }) {
  return (
    <div className="flex flex-row justify-between  items-center bg-gray-900 rounded-lg px-2 mb-2">
      <TextTitle text="Categoria" />
      {category !== null && (
        <p className="my-2 font-sans text-end text-xl text-green-500 font-bold">
          {category}
        </p>
      )}
      {category === null && (
        <p className="text-gray-500 text-sm font-medium text-end my-[12px]">
          Nenhuma categoria selecionada
        </p>
      )}
    </div>
  );
}
