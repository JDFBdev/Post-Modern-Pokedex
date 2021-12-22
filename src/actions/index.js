const axios = require('axios');


export function getAllPokemon() {     
    return async function(dispatch) {         // store.dispatch()
        let promise = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151%27`)
        let response = promise.data;
        dispatch({ type: "GET_ALL_POKEMON", payload: response });
    };
}

export function getPokemonDetail(id) {     
    return async function(dispatch) {         // store.dispatch()
        let promise = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let response = promise.data;
        dispatch({ type: "GET_POKEMON_DETAIL", payload: response });
    };
}

export function clearDetail() {     
    return({ type: "CLEAR_DETAIL"});
}