import React from 'react';
import s from './Cards.module.css';
import Card from '../Card/Card';
import ReactTooltip from 'react-tooltip';

export default function Cards({selected, render}) {

    return (
    <div className={s.cards}>
        {
        (render?.map((p,index) =>(
            <Card name={p.name} id={p.id} key={p.id} selected={selected} />
        )))
        }
    </div>
        )
    };