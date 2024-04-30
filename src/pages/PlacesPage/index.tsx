import { useEffect, useState } from "react";
import { PlaceModel } from "../../models/PlaceModel";
import { getPlacesService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import PlaceListItem from "../../components/PlaceListTile";
import { Link, useNavigate } from "react-router-dom";

export default function PlacesPage() {
  const [places, setPlaces] = useState<PlaceModel[]>([]);
  const { token } = useAuth();

  const [isLoading, setisLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPlaces = async () => {
      if (token === null) {
        navigate("/", { replace: true });
        return;
      }

      setisLoading(true);
      try {
        const data = await getPlacesService(token, null);
        setPlaces(data);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
    };

    getPlaces();
  }, [token]);

  return (
    <div>
      <Link style={{ margin: "1rem" }} to="/profile">
        Voltar
      </Link>
      <ul>
        {places.map((place) => (
          <PlaceListItem place={place} />
        ))}
      </ul>
    </div>
  );
}
