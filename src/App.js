import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

class App extends Component {

  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };
  state ={
    lists: STORE.lists,
    cards: STORE.cards
  }
  

  handleDelete=(listId,cardId)=>{
    console.log(listId, cardId)
    const newLists = this.state.lists.map(list =>{
      if(list.id === listId){
        const filteredCardIds = list.cardsIds.filter(listCardId => listCardId !== cardId);
        return{...list, cardIds: filteredCardIds}
      }
      return list;
    })
    this.omit(listId, cardId)
    this.setState({lists: newLists})

  
  };
  omit = (obj, keyToOmit) => {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }

  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              id ={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onDeleteItem={this.handleDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
