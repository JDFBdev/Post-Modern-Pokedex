import React from "react";
import Buscador from "./components/Buscador/Buscador";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemon }  from './actions/index';


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => { // Get the pokemons with a component did mount
    dispatch(getAllPokemon());
  }, [dispatch]);

  const allPokemon = useSelector((state)=> state.pokemonLoaded);

  return (
    <Buscador allPokemon={allPokemon} />
  );
}

export default App;
