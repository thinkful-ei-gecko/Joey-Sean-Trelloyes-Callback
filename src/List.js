import React from 'react';
import Card from './Card'
import './List.css';

export default function List(props) {
  return (
    <section className='List'>
      <header className='List-header'>
        <h2>{props.header}</h2>
      </header>
      <div className='List-cards'>
        {props.cards.map((card) =>
          <Card
            id={card.id}
            key={card.id}
            title={card.title}
            content={card.content}
            
            onDeleteItem={props.onDeleteItem}
          />
        )}
        <button
          type='button'
          className='List-add-button'
          onClick={()=>props.onAdd(props.id)}
        >
          + Add Random Card
        </button>
      </div>
    </section>
  )
}
