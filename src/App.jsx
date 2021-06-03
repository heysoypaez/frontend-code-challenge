import React, { useCallback, useState } from 'react';
import Pokemon from "./pokemon"
import {sortByName } from "./utils/sort"
import config from "./config"
import './App.css';
const { API_URL, LOADING_URL } = config

const App = () => {

    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)    
    const [pokemonsFound, setPokemonsFound] = useState(undefined)
    const [nameSearched,setNameSearched] = useState("") 
    const [searchQuery,setSearchQuery] = useState("")

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
        setSearchQuery(value)
        const THRESHOLD_FETCH = 1
        if(value.length === THRESHOLD_FETCH && pokemons.length === 0) {
            const data = await getPokemons(API_URL)
            setPokemons(data)
        }
        if(pokemons.length > 1) {
            setNameSearched("")
            const filteredPokemons = pokemons.filter(pokemon => {
                const {Name, Types} = pokemon
                const searchByType = Types.some((type) => type.includes(value));
                const searchByName = Name.includes(value)
                searchByName && setNameSearched(value)
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
            { pokemonsFound?.length > 0 && searchQuery ? (
              pokemonsFound.map(filteredPokemon => (
                <Pokemon 
                    pokemon={filteredPokemon} 
                    key={filteredPokemon.Number} 
                    nameSearched={nameSearched} 
                />)
              )        
            )
            : pokemonsFound?.length === 0 ?
            <li>
                <img src={LOADING_URL} alt="" />
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
