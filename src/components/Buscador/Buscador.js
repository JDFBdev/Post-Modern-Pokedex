import React, { useEffect, useState } from "react";
import s from './Buscador.module.css';
import background from '../../Images/background.gif';
import pokedex from '../../Images/POKEDEX.png';
import Cards from '../Cards/Cards';
import { Route } from "react-router-dom";
import Pokemon from '../Pokemon/Pokemon.js';
import { useHistory } from "react-router-dom";
import { clearDetail, getPokemonDetail }  from '../../actions/index.js';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {isMobile} from 'react-device-detect';

export default function Buscador({allPokemon}){
  const [selected, setSelected] = useState({id:1, key:null, origin: null});
  const [render, setRender] = useState(allPokemon.slice(0,8));
  const [state, setState] = useState({title: ''});
  const pokemon = useSelector((state)=> state.pokemonDetail);
  let history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
  }, []);

  function onKeyDown(event) {
    if (!isMobile){
      if ((event.code === 'ArrowUp' || event.code === 'KeyW') && (selected.id>=5)){window.removeEventListener('keydown', onKeyDown);handleUp('e')}
      else if ((event.code === 'ArrowDown' || event.code === 'KeyS') && (selected.id<149)){window.removeEventListener('keydown', onKeyDown);handleDown('e')}
      else if ((event.code === 'ArrowLeft' || event.code === 'KeyA') && (selected.id>1)){window.removeEventListener('keydown', onKeyDown);handleLeft('e')}
      else if ((event.code === 'ArrowRight' || event.code === 'KeyD') && (selected.id<152)){window.removeEventListener('keydown', onKeyDown);handleRight('e')}
      else if (event.code === 'Space'){handleA()}
      else if (event.code === 'KeyB'){handleB()}
    }
    
  } 

  useEffect(() => { // Get the pokemons with a component did mount
    setRender(allPokemon.slice(0,8))
  }, [allPokemon]);

  const handleInput = function(e) {
    setState(prevInput => ({title: e.target.value}));
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    if(Number((state.title)<=151 && Number(state.title)>=1) || isNaN(Number(state.title))){
      dispatch(getPokemonDetail(state.title));
      history.push(`/pokemon`);
    }else{
      alert('Number must be between 1 and 151!')
    }

  }

  const handleUp = function(e){
    if(e==='e'){
      if (selected.id>=5){
        setSelected(prevSelected=>({id: prevSelected.id-4, key:'up', origin: 'board'}));
      }
    }
    else if (selected.id>=5){
      setSelected(prevSelected=>({id: prevSelected.id-4, key:'up', origin: null}));
    }
  }

  const handleLeft = function(e){
    if(e==='e'){
      if (selected.id>1){
        setSelected(prevSelected=>({id: prevSelected.id-1, key:'left', origin: 'board'}));
      }
    }else if (selected.id>1){
      setSelected(prevSelected=>({id: prevSelected.id-1, key:'left', origin: null}));
    }
  }

  const handleRight = function(e){
    if(e==='e'){
      if (selected.id<152){
        setSelected(prevSelected=>({id: prevSelected.id+1, key:'right', origin: 'board'}));
      }
    }else if (selected.id<152){
      setSelected(prevSelected=>({id: prevSelected.id+1, key:'right', origin: null}));
    }
  }

  const handleDown = function(e){
    if(e==='e'){
      if (selected.id<149){
        setSelected(prevSelected=>({id: prevSelected.id+4, key:'down', origin: 'board'}));
      }
    }else if (selected.id<149){
      setSelected(prevSelected=>({id: prevSelected.id+4, key:'down', origin: null}));
    }
  }

  useEffect(() => { 
    handleRender(selected.key);
    if(selected.origin==='board'){
      window.addEventListener('keydown', onKeyDown);
    }
  }, [selected]);


  const handleRender = function(arrow){
  
    let isRendered = false;
    if (render.filter(e => e.id === selected.id).length > 0) {
      isRendered = true;
    }

    if(!isRendered){
      if(arrow === 'down' || arrow === 'right'){
        let x1 = render[0].id+3;
        let x2 = render[7].id+4;
        setRender(allPokemon.slice(x1,x2));
      }
      else if(arrow === 'up' || arrow === 'left'){
        let x1 = render[0].id-5;
        let x2 = render[7].id-4;
        setRender(allPokemon.slice(x1,x2));
      }
    }
  }

  const handleA = function(e){
    if(selected.id===152){history.push(`/about`);}
    else{
      dispatch(getPokemonDetail(selected.id));
      history.push(`/pokemon`);
    }
  }

  const handleB = function(e){
    dispatch(clearDetail());
    history.push(`/`);
  }

  return(
    <div className={s.container}>
      <div className={s.background} style={{backgroundImage: `url(${background})`}}/>
      <div className={s.pokedex}>
        <img alt="pokedex" className={s.pokedexImg} src={pokedex}/>
        <form className={s.form} >
          <input className={s.input} onChange={handleInput} name='title' value={state.title} placeholder="Search by name or ID..." />
          <button type="submit" className={s.btnSubmit} onClick={handleSubmit}/>
        </form>
        <div className={s.info} data-tip data-for='tooltip'/>
        <ReactTooltip id='tooltip' place='top' effect="solid" >
          Welcome to Post-Modern Pokedex! <br/>
          • You can use your keyboard's arrows or WASD to navigate.<br/>
          • If you are using a mobile device, use the DPAD to navigate.<br/>
          • Use A or Space to get details about any pokemon and B or the 'B' key to return<br/>
          to the browser.<br/>
          • You can also search pokemon by id or name.
        </ReactTooltip>
        <Route exact path='/' >
          <Cards selected={selected.id} render={render}/>
            {isMobile && 
            <div className={s.dpad}>
              <div>
                <button onClick={handleUp} className={s.up} ></button>
              </div>
              <div>
                <button onClick={handleLeft} className={s.left}  ></button>
              <button onClick={handleRight} className={s.right}></button>
              </div>
              <div>
              <button onClick={handleDown} className={s.down}></button>
              </div>
            </div>
          }
         <button onClick={handleA} className={s.a}/>
         <button className={s.b}/>
         {
           isMobile &&
            <p className={s.swipe}>{`Swipe =>`}</p>   
         }
       </Route>
       <Route path='/pokemon' >
         <Pokemon pokemon={pokemon} />
       </Route>
      </div>
    </div>
  )
  
}
