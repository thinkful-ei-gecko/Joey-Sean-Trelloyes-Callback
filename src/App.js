import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

class App extends Component {

  
  state ={
    lists: STORE.lists,
    cards: STORE.allCards
  }
  

  handleDelete=(cardId)=>{
    console.log(cardId)
    const newLists = this.state.lists.map(list =>({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)

    }))
    const newCards = this.omit(this.state.cards, cardId)
     
    this.setState({
      lists: newLists,
      cards: newCards
    })
  
  }


  omit = (obj, keyToOmit) => {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }


  newRandomCard = () => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
  }


  handleAddCard = (listId) => {
    console.log(listId)
    const myNewCard = this.newRandomCard();
    const newCardList = {...this.state.cards, [myNewCard.id] : myNewCard };
    const lists = this.state.lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds:[...list.cardIds, myNewCard.id]
        }
    } 
    return list;
    });
    this.setState ({
      cards : newCardList,
      lists
    })
    console.log(newCardList);
  }

  render() {
    
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              onAdd = {this.handleAddCard}
              id ={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.cards[id])}
              onDeleteItem={this.handleDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
