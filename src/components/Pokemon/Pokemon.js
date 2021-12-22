import React, { useEffect, useState } from "react";
import { getPokemonDetail }  from '../../actions/index.js';
import s from './Pokemon.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Pokemon({pokemon}){
    const dispatch = useDispatch();

    
    const capitalizeName = function(name){
        let ans = name.charAt(0).toUpperCase() + name.slice(1);
        if (ans === 'Mr-mime'){
          ans = 'Mr. Mime';
        }
        return ans;
    } 

    const handleLeft = function(){
        dispatch(getPokemonDetail(pokemon.id-1));

    }
    
    const handleRight = function(){
        dispatch(getPokemonDetail(pokemon.id+1));

    }
    

    const typeColor = function(type){
        if(type==='grass'){return 'rgb(93, 224, 69)'}
        if(type==='poison'){return 'rgb(166, 30, 179)'}
        if(type==='fire'){return 'rgb(172, 5, 5)'}
        if(type==='flying'){return 'rgb(175, 224, 247)'}
        if(type==='water'){return 'rgb(45, 185, 250)'}
        if(type==='bug'){return 'rgb(54, 131, 43)'}
        if(type==='normal'){return 'rgb(151, 151, 149)'}
        if(type==='electric'){return 'rgb(224, 224, 43)'}
        if(type==='ground'){return 'rgb(161, 82, 36)'}
        if(type==='fairy'){return 'rgb(251, 149, 255)'}
        if(type==='fighting'){return 'rgb(206, 113, 27)'}
        if(type==='psychic'){return 'rgb(240, 29, 212)'}
        if(type==='rock'){return 'rgb(119, 67, 32)'}
        if(type==='steel'){return 'rgb(95, 95, 94)'}
        if(type==='ice'){return 'rgb(127, 228, 253)'}
        if(type==='dragon'){return '#7C6BC7'}
    } 


    return (
        <div> {(pokemon.forms || pokemon.id>151) ? 
            (<div>
                <div className={s.screen}>
                    <div className={s.header}>
                        <h3  className={s.title}>{capitalizeName(pokemon.forms[0].name)}</h3>
                        <h4 className={s.id}>Nº {pokemon.id}</h4>
                    </div>
                    <img className={s.img} src={`https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/${pokemon.forms[0].name}.gif`}/>
                </div>
                <div className={s.data}>
                    <div className={s.stats}>
                        <p>HP: {pokemon.stats[0].base_stat}</p>
                        <p>Atk: {pokemon.stats[1].base_stat}</p>
                        <p>Def: {pokemon.stats[2].base_stat}</p>
                        <p>Spd: {pokemon.stats[5].base_stat}</p>
                        <p>Sp. Atk: {pokemon.stats[3].base_stat}</p>
                        <p>Sp. Def: {pokemon.stats[4].base_stat}</p>
                    </div>
                    <div className={s.types} > 
                        <div className={s.type1} style={{color: typeColor(pokemon.types[0].type.name)}} >{capitalizeName(pokemon.types[0].type.name)}</div>
                        { pokemon.types[1] && <div className={s.type2} style={{color: typeColor(pokemon.types[1].type.name)}} >{capitalizeName(pokemon.types[1].type.name)}</div>}
                    </div>
                </div>
            </div>
            ) : ((pokemon.id>151) ? (<h1 className={s.error} >No matching Results</h1>) : null)
            }
            <div className={s.dpad}>
                <div>
                    <button  className={s.up} ></button>
                </div>
                <div>
                    <button onClick={handleLeft} className={s.left}  ></button>
                    <button onClick={handleRight} className={s.right}></button>
                </div>
                <div>
                <button className={s.down}></button>
                </div>
            </div>
        </div>
    );
}


//https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/${pokemon.forms[0].name}.gif
//https://projectpokemon.org/images/normal-sprite/${pokemon.forms[0].name}.gif


 
