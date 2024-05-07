import { useState } from "react";
import { PlaceModel } from "../../models/PlaceModel";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

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
    <div
      key={place.id}
      className=" border-gray-500 border-[0.5px] shadow-md shadow-gray-800 m-4 rounded-lg p-4 cursor-pointer "
    >
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
          {place.professions.map((prof) => (
            <li
              key={`${prof.id}expand`}
              className="text-lg py-1 font-medium text-blue-200 border-b-[1px] border-gray-600"
            >
              {prof.name}
            </li>
          ))}
        </ol>
      ) : (
        <ol className="transition-all duration-500 ease-in-out max-h-0 overflow-hidden">
          {place.professions.map((prof) => (
            <li
              key={prof.id}
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
