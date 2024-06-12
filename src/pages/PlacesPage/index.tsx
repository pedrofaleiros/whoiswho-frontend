import React, { useEffect, useState } from "react";
import { PlaceModel } from "../../models/PlaceModel";
import {
  getCategoriesService,
  getPlacesByCategoryService,
  getPlacesService,
} from "../../services/api";
import PlaceListItem from "../../components/PlaceListTile";
import { Link, useNavigate } from "react-router-dom";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClear,
  MdSearch,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CategoryModel } from "../../models/CategoryModel";
import { TextButton } from "../../components/common/Buttons";
import { TextTitle } from "../../components/common/Texts";

export default function PlacesPage() {
  const [places, setPlaces] = useState<PlaceModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const [selected, setSelected] = useState<string | null>(null);

  const [isLoading, setisLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getPlaces = async () => {
      setisLoading(true);
      try {
        const data = await getPlacesService(null);
        setPlaces(data);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
    };

    const getCategories = async () => {
      try {
        const data = await getCategoriesService();
        setCategories(data);
      } catch (error) {}
    };

    getPlaces();

    getCategories();
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (search !== "") {
      setisLoading(true);

      setSelected(null);

      try {
        const data = await getPlacesService(search);
        setPlaces(data);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
    }
  };

  const handleCategory = async (event: any, id: string) => {
    event.preventDefault();

    if (id === selected) {
      setSelected(null);
      setisLoading(true);

      try {
        const data = await getPlacesService(null);
        setPlaces(data);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
      return;
    } else {
      setSelected(id);
      setisLoading(true);

      try {
        const data = await getPlacesByCategoryService(id);
        setPlaces(data);
      } catch (error) {
      } finally {
        setisLoading(false);
      }
    }
  };

  const handleClear = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (search === "" && selected === null) return;

    setisLoading(true);

    try {
      const data = await getPlacesService(null);
      setPlaces(data);
      setSelected(null);
      setSearch("");
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full p-4 flex flex-row items-center justify-between">
        <Link
          className="text-blue-500 hover:text-blue-400 text-xl  w-min"
          to="/profile"
        >
          Voltar
        </Link>

        <div>
          <TextButton onClick={handleClear} text="Limpar filtros">
            <MdClear />
          </TextButton>
        </div>
      </div>

      <form className="mx-4 my-2 relative" onSubmit={handleSubmit}>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <input className="hidden js-password-toggle" id="toggle" />
          <button type="submit">
            <MdSearch className="h-6 w-6 text-gray-400 cursor-pointer" />
          </button>
        </div>
        <input
          className="appearance-none border-2 rounded-lg w-full py-3 px-3 leading-tight border-gray-400 bg-gray-950 focus:outline-none focus:border-blue-500 focus:bg-gray-900 text-lg pr-16 font-mono text-gray-300"
          placeholder="Pesquisar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="mx-4 flex flex-col">
        <TextTitle text="Categorias" />
        {categories.map((c) => {
          return (
            <div
              onClick={(e) => {
                handleCategory(e, c.id);
              }}
              key={c.id}
              className="flex flex-row items-center gap-1 p-2 cursor-pointer rounded-lg hover:bg-gray-800"
            >
              {c.id === selected && (
                <MdCheckBox className="text-green-500 size-6 cursor-pointer" />
              )}
              {c.id !== selected && (
                <MdCheckBoxOutlineBlank
                  onClick={(e) => {
                    handleCategory(e, c.id);
                  }}
                  className="size-6 cursor-pointer"
                />
              )}
              <p className="text-base">{c.name}</p>
            </div>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex  justify-center mt-32">
          <AiOutlineLoading3Quarters className="animate-spin w-12 h-12  text-blue-500" />
        </div>
      )}

      <div className="mx-4 mt-4 flex flex-row justify-between">
        <TextTitle text="Locais" />
        <TextTitle text={`Total: ${places.length}`} />
      </div>

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
