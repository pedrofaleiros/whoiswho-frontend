import { useState } from "react";
import { PlaceModel } from "../../models/PlaceModel";

import "./styles.css";

interface PlaceListItemProps {
  place: PlaceModel;
}

export default function PlaceListItem({ place }: PlaceListItemProps) {
  const [showProfessions, setShowProfessions] = useState<boolean>(false);

  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    setShowProfessions(!showProfessions);
  };

  return (
    <div className="placeListItem" onClick={handleExpand}>
      <div className="placeTitle">
        <h4>{place.name}</h4>
      </div>

      {showProfessions && (
        <ol className="profList">
          {place.professions.map((prof) => (
            <div className="profListItem">
              <h6>{prof.name}</h6>
            </div>
          ))}
        </ol>
      )}
    </div>
  );
}
