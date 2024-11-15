import React from 'react'
import './index.css'

function Card({ pokemon }) {
  return (
    <div className='card'>
        <img alt={pokemon.name} src={pokemon.sprites.front_default}></img>
        <div className='content'>
          <h3>{pokemon.name}</h3>
          <h2>#{pokemon.id}</h2>
        </div>
    </div>
  )
}

export default Card