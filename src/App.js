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
  handleDelete=(id)=>{
    console.log(id,'delete was called')

  };

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
