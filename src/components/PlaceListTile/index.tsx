import { useState } from "react";
import { PlaceModel } from "../../models/PlaceModel";
import { MdExpand, MdExpandLess, MdExpandMore } from "react-icons/md";

interface PlaceListItemProps {
  place: PlaceModel;
}

export default function PlaceListItem({ place }: PlaceListItemProps) {
  const [showProfessions, setShowProfessions] = useState<boolean>(false);

  const handleExpand = (event: any) => {
    event.preventDefault();

    setShowProfessions(!showProfessions);
  };

  return (
    <div className=" border-2 border-gray-300 m-4 rounded-lg p-4 cursor-pointer ">
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-xl text-gray-300 font-semibold font-mono">
          {place.name}
        </h4>

        {showProfessions ? (
          <MdExpandLess onClick={handleExpand} className="h-6 w-6" />
        ) : (
          <MdExpandMore onClick={handleExpand} className="h-6 w-6" />
        )}
      </div>

      {showProfessions ? (
        <ol className="pt-2 transition-all duration-500 ease-in-out max-h-96 overflow-hidden">
          {place.professions.map((prof, index) => (
            <li
              key={index}
              className="text-lg py-1 font-medium text-blue-200 border-b-[1px] border-gray-600"
            >
              {prof.name}
            </li>
          ))}
        </ol>
      ) : (
        <ol className="transition-all duration-500 ease-in-out max-h-0 overflow-hidden">
          {place.professions.map((prof, index) => (
            <li
              key={index}
              className="text-lg py-1 font-medium text-blue-200 border-b-[1px] border-gray-600"
            >
              {prof.name}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
