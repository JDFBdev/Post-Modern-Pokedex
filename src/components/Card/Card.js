import React from 'react';
import s from './Card.module.css';

export default function Card({name, id, selected}) {

  const capitalizeName = function(name){

    let ans = name.charAt(0).toUpperCase() + name.slice(1);

    if (ans === 'Mr-mime'){
      ans = 'Mr. Mime';
    }

    return (<p>{ans}</p>)
    
  } 

  return (
      <div className={(id === selected) ? s.selectedContainer : s.container}>
          <p className={s.name} >{capitalizeName(name)}</p>
          {(name === 'about') ? (<div>
            <p className={s.id}>&nbsp;</p>
            <img alt='about gif' className={s.img} src={`https://64.media.tumblr.com/c130a540ef4b75da584123f3f7f24721/tumblr_ohb5qyLzZX1rpn9eno1_540.gif`}></img>
          </div>) : (
            <div>
              <p className={s.id}>Nº {id}</p>
              <img alt='pokemon' className={s.img} src={`https://img.pokemondb.net/sprites/x-y/normal/${name}.png`}></img>
            </div>
            )
          }
      </div>
    )
  };
    
