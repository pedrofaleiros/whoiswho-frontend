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
      className=" border-gray-700 border-2 mx-4 my-3 rounded-lg p-3 cursor-pointer "
    >
      <div className="flex flex-row items-center justify-between">
        <h4 className="text-lg text-gray-300 font-semibold">{place.name}</h4>

        {showProfessions ? (
          <MdExpandLess onClick={handleExpand} className="h-6 w-6" />
        ) : (
          <MdExpandMore onClick={handleExpand} className="h-6 w-6" />
        )}
      </div>

      {showProfessions ? (
        <ol className="transition-all duration-500 ease-in-out max-h-96 overflow-hidden">
          {place.professions.map((prof) => (
            <li
              key={`${prof.id}expand`}
              className="text-base py-1.5 font-medium text-blue-400 border-b-[1px] border-gray-700"
            >
              {prof.name}
            </li>
          ))}
        </ol>
      ) : (
        <ol className="transition-all duration-500 ease-in-out max-h-0 overflow-hidden">
          {place.professions.map((prof) => (
            <li
              key={`${prof.id}expand`}
              className="text-base py-1.5 font-medium text-blue-400 border-b-[1px] border-gray-700"
            >
              {prof.name}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
