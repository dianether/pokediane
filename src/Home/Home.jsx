import React, { useEffect, useState } from 'react'
import './index.css'
import Header from '../App/Header/Header'
import Card from '../Components/Card/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

function Home() { 

  const [pokemonList, setPokemonList] = useState(undefined);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0)

  const fetchData = async (index) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
      if (!response.ok) throw new Error('Error en la solicitud');
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("sin resultados de pokemón")
      setPokemonList([])
    }
  };

  const fetchPokemonList = async () => {
    const pokeArray = [];
    for (let index = (page*9)+1; index <= (page*9)+9; index++) {
      const pokeInfo = await fetchData(index);
      pokeArray.push(pokeInfo);
    }
    setPokemonList(pokeArray);
  };

  useEffect(() => {
    fetchPokemonList(); 
  }, [page]);
  
  const searchChange = async (event) => {
    setSearch(event.target.value);
    let pokeInfo; 
    
    if (event.target.value.length > 0) {
      pokeInfo = await fetchData(event.target.value);
    } else {
      fetchPokemonList(); 
    }
    
    if (pokeInfo) {
      setPokemonList([pokeInfo]);
    }
  };

  return (
    <div className='home'>
        <Header/>
        <section className='nav'>
          <nav>
            <div className='arrow' onClick={() => {!page == 0 && setPage(page - 1)}}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
            <div className='input'>
              <input
                type="text"
                id="search"
                value={search}
                onChange={searchChange}
                />
            </div>
            <div className='arrow' onClick={() => setPage(page + 1)}>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>  
          </nav>
        </section>
        <section className='pokemon-list'>
          {pokemonList && pokemonList.length > 0 && pokemonList.map((pokemon,i) => {
            return (
              <Card key={i} pokemon={pokemon}/>
            );
          })}
        </section>
    </div>
  )
}

export default Home