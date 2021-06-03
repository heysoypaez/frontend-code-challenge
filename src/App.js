import React, { useCallback, useState } from "react";
import Pokemon from "./components/pokemon";
import NotResults from "./components/not-results"
import { sortByName, sortByMaxCp } from "./utils/sort";
import config from "./config";
import "./App.css";
const { API_URL } = config;

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokemonsFound, setPokemonsFound] = useState(undefined);
  const [nameSearched, setNameSearched] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  /**
   Helpers
  */

  const getPokemons = useCallback(async (url) => {
    setLoading(true);
    return await fetch(url)
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  }, []);

  const filterPokemons = (pokemonsList, searchQueryValue) =>
    pokemonsList
      .filter((pokemon) => {
        const { Name, Types } = pokemon;
        const searchByType = Types.some((type) =>
          type.toLowerCase().includes(searchQueryValue)
        );
        const searchByName = Name.toLowerCase().includes(searchQueryValue);
        searchByName && setNameSearched(searchQueryValue);
        return searchByType || searchByName;
      })
      .slice(0, 4)
      .sort(sortByName);

  /**
   Handlers
  */

  const handleInputChange = async (event) => {
    const {
      target: { value },
    } = event;
    const query = value.toLowerCase();
    setSearchQuery(query);
    const THRESHOLD_FETCH = 1;
    if (query.length === THRESHOLD_FETCH && pokemons.length === 0) {
      const data = await getPokemons(API_URL);
      setPokemons(data);
    }
    if (pokemons.length > 1) {
      setNameSearched("");
      const filteredPokemons = filterPokemons(pokemons, query);
      setPokemonsFound(filteredPokemons);
    }
  };

  const handleMaxCPInputChange = (event) => {
    const {
      target: { checked },
    } = event;

    if (checked) {
      const sortedByMaxCp = pokemons.sort(sortByMaxCp);
      const filteredPokemons = filterPokemons(sortedByMaxCp, searchQuery).sort(
        sortByMaxCp
      );
      setPokemons(sortedByMaxCp);
      setPokemonsFound(filteredPokemons);
    } else {
      const sortedByName = pokemons.sort(sortByName);
      const filteredPokemons = filterPokemons(sortedByName, searchQuery);
      setPokemons(sortedByName);
      setPokemonsFound(filteredPokemons);
    }
  };

  /**
   Render
  */

  return (
    <>
      <label htmlFor="maxCP" className="max-cp">
        <input type="checkbox" id="maxCP" onChange={handleMaxCPInputChange} />
        <small>Maximum Combat Points</small>
      </label>
      <input
        type="text"
        className="input"
        placeholder="Pokemon or type"
        onChange={handleInputChange}
      />

      <ul className="suggestions">
        {loading && <div className="loader"></div>}
        {pokemonsFound?.length > 0 && searchQuery ? (
          pokemonsFound.map((filteredPokemon) => (
            <Pokemon
              pokemon={filteredPokemon}
              key={filteredPokemon.Number}
              nameSearched={nameSearched}
            />
          ))
        ) : pokemonsFound?.length === 0 ? ( <NotResults /> ) 
          : <></>
        }
      </ul>
    </>
  );
};

export default App;
