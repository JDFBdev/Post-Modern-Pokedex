import React from "react";
import Buscador from "./components/Buscador/Buscador";
import About from "./components/About/About.js";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemon }  from './actions/index';


function App() {
  const dispatch = useDispatch();

  React.useEffect(() => { // Get the pokemons with a component did mount
    dispatch(getAllPokemon());
  }, []);

  const allPokemon = useSelector((state)=> state.pokemonLoaded);

  return (
      <React.Fragment>
          <Route path="/" render={(props) => (
            <Buscador {...props} allPokemon={allPokemon} />
          )} />
          <Route exact path="/about" component={About} />
      </React.Fragment>
  );
}

export default App;
