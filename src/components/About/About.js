import React from 'react';
import s from './About.module.css';
import git from '../../Images/LOGO_GITHUB.png';
import gmail from '../../Images/LOGO_GMAIL.png';
import linkedin from '../../Images/LOGO_LINKEDIN.png';
import { useHistory } from "react-router-dom";

export default function About({name, id, selected}) {
    let history = useHistory();

    const handleB = function(e){
        history.push(`/`);
      }
      
  return (
      <div>
        <div>
            <h1 className={s.title} >Welcome to Post-Modern Pokedex!</h1>
            <p className={s.text}>This App was created to get myself some experience points in React - Redux,
                CSS, Event Listeners and various react add-ons.
                None of the styles have been imported.
                Thanks for passing by to check out my project! <br/>
                - Juan Diego Fernández Bottarini</p>
        </div>
        <div className={s.linksdiv} >
            <img src={linkedin} className={s.icon} onClick={() => { window.open('https://www.linkedin.com/in/jdfbdev/','_blank')}} />
            <img src={gmail} className={s.icon} onClick={() => { window.open('mailto:JDFBdeveloper@gmail.com?','_blank')}} />
            <img src={git} className={s.icon} onClick={() => { window.open('https://github.com/JDFBdev','_blank')}} />
        </div>
        <button className={s.a}></button>
        <button onClick={handleB} className={s.b}></button>
      </div>
      
    )
  };
    
