import React, { useEffect, useState } from "react";
import { PlaceModel } from "../../models/PlaceModel";
import { getPlacesService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import PlaceListItem from "../../components/PlaceListTile";
import { Link, useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function PlacesPage() {
  const [places, setPlaces] = useState<PlaceModel[]>([]);
  const { token } = useAuth();

  const [stateToken, setStateToken] = useState<string>("");

  const [isLoading, setisLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getPlaces = async () => {
      if (token === null) {
        navigate("/", { replace: true });
        return;
      }

      setStateToken(token);
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
  }, [token, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search !== "") {
      setisLoading(true);

      try {
        const data = await getPlacesService(stateToken, search);
        setPlaces(data);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
    }
  };

  const handleClear = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setisLoading(true);

    try {
      const data = await getPlacesService(stateToken, null);
      setPlaces(data);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Link
        className="text-blue-500 hover:text-blue-400 m-4 text-xl  w-min"
        to="/profile"
      >
        Voltar
      </Link>

      <form className="mx-4 my-2 relative" onSubmit={handleSubmit}>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <input className="hidden js-password-toggle" id="toggle" />
          <button type="submit">
            <MdSearch className="h-6 w-6 text-gray-400 cursor-pointer" />
          </button>
        </div>
        <input
          className="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-400 bg-gray-900 focus:outline-none focus:border-blue-500 focus:bg-gray-950 text-lg pr-16 font-mono text-gray-300"
          placeholder="Pesquisar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="mx-4 mb-4 text-end">
        <button
          type="button"
          onClick={handleClear}
          className=" w-min font-medium text-blue-400"
        >
          Limpar
        </button>
      </div>

      {isLoading && (
        <div className="flex  justify-center mt-32">
          <AiOutlineLoading3Quarters className="animate-spin w-12 h-12  text-blue-500" />
        </div>
      )}

      {isLoading === false && (
        <ul>
          {places.map((place) => (
            <PlaceListItem key={place.id} place={place} />
          ))}
        </ul>
      )}
    </div>
  );
}
