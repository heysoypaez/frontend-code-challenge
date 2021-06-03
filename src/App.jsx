import React, { useCallback, useState } from 'react';
import Pokemon from "./pokemon"
import {sortByName } from "./utils/sort"
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {

    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)    
    const [pokemonsFound, setPokemonsFound] = useState(undefined)

    const getPokemons = useCallback(async(url) => {
        setLoading(true)
        return await fetch(url)
          .then(response => {
            setLoading(false)
            return response.json()
          })
          .catch(err => {
            setLoading(false)
            return err
          })
    },[])


    const handleInputChange = async (event) => {
        const { target: { value } } = event
        const THRESHOLD_FETCH = 1
        const THRESHOLD_SEARCH = 2
        if(value.length === THRESHOLD_FETCH && pokemons.length === 0) {
            const data = await getPokemons(URL_PATH)
            setPokemons(data)
        }
        if(pokemons.length > 1) {
            const filteredPokemons = pokemons.filter(pokemon => {
                const {Name, Types} = pokemon
                const searchByType = Types.some((type) => type.includes(value));
                const searchByName = Name.includes(value)
                return searchByType || searchByName
            }).slice(0,4)
              .sort(sortByName);

            setPokemonsFound(filteredPokemons)
            console.log(filteredPokemons)
        }

    }

    return (<>
        <label htmlFor="maxCP" className="max-cp">
            <input type="checkbox" id="maxCP" />
            <small>
                Maximum Combat Points
            </small>
        </label>
        <input type="text" className="input" placeholder="Pokemon or type" onChange={handleInputChange}
        />
        
        <ul className="suggestions">
            {
                loading && <div className="loader"></div>
                
            }
            { pokemonsFound?.length > 0 ? (
              pokemonsFound.map(filteredPokemon => <Pokemon pokemon={filteredPokemon} key={filteredPokemon.Number} />)        
            )
            : pokemonsFound?.length === 0 ?
            <li>
                <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
                <div className="info">
                    <h1 className="no-results">
                        No results
                    </h1>
                </div>
            </li>
            : <></>
            }


        </ul>
    </>)
};

export default App;
