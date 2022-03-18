const initialState = {
    pokemonLoaded: [],
    pokemonDetail: {}
  };


  function rootReducer(state = initialState, action) {
    if (action.type === "GET_ALL_POKEMON") {
        let result = action.payload.results;
        result.push({name: 'about'})
        result.map((p,index)=>{return p.id = index+1; });
        return {
          ...state,
          pokemonLoaded: result        // results es una propiedad que me devolvio la API en payload
        };
    }
    if (action.type === "GET_POKEMON_DETAIL") {
        return {
          ...state,
          pokemonDetail: action.payload        
        };
    }
    if (action.type === "CLEAR_DETAIL") {
      return {
        ...state,
        pokemonDetail: {}
      };
  }
    return state;
  }
  
  export default rootReducer;