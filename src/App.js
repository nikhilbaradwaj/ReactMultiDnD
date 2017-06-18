import React, { Component } from 'react';
import Cart from './Cart'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ItemsDragLayer from './ItemsDragLayer';

const styles = {
  main: {
    width: '50%',
    margin: '0 auto',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'left',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
};

class App extends Component {

  componentWillMount() {
    this.state = { leftItems: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8"], rightItems: [] };
    this.addItemsToCart = this.addItemsToCart.bind(this);
  }

  addItemsToCart(items, source, dropResult) {
    const leftItems = source === 'left' ? this.state.leftItems.filter(x => items.findIndex(y => x === y) < 0) :
      this.state.leftItems.concat(items);
    const rightItems = source === 'left' ? this.state.rightItems.concat(items) :
      this.state.rightItems.filter(x => items.findIndex(y => x === y) < 0);
    this.setState({ leftItems, rightItems });
  }

  render() {
    return (
      <div style={styles.main}>
        <h2>Drag and drop multiple items with React DnD</h2>
        <h4>Use Shift or Cmd key to multi-select</h4>
        <ItemsDragLayer />
        <div style={styles.content}>
          <Cart id='left' fields={this.state.leftItems} addItemsToCart={this.addItemsToCart} />
          <Cart id='right' fields={this.state.rightItems} addItemsToCart={this.addItemsToCart} />
        </div>
      </div>
    );
  }
}

const dragDropContext = DragDropContext;
export default dragDropContext(HTML5Backend)(App);
