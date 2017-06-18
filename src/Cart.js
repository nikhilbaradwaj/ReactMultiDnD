import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Item from './Item';

const styles = {
  content: {
    borderStyle: 'solid',
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 50,
    width: 300,
    height: 300,
  },
};

const nodeTarget = {
  drop(props) {
    return props.data;
  },
  canDrop(props, monitor) {
    return monitor.getItem().source !== props.id;
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class Cart extends React.Component {

  componentWillMount() {
    this.state = { selectedFields: [], lastSelectedIndex: -1 };
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.handleItemSelection(-1, false, false);
  }

  handleItemSelection(index, cmdKey, shiftKey) {
    let selectedFields;
    const fields = this.props.fields;
    const field = index < 0 ? '' : fields[index];
    const lastSelectedIndex = index;
    if (!cmdKey && !shiftKey) {
      selectedFields = [field];
    } else if (shiftKey) {
      if (this.state.lastSelectedIndex >= index) {
        selectedFields = [].concat.apply(this.state.selectedFields,
          fields.slice(index, this.state.lastSelectedIndex));
      } else {
        selectedFields = [].concat.apply(this.state.selectedFields,
          fields.slice(this.state.lastSelectedIndex + 1, index + 1));
      }
    } else if (cmdKey) {
      const foundIndex = this.state.selectedFields.findIndex(f => f === field);
      // If found remove it to unselect it.
      if (foundIndex >= 0) {
        selectedFields = [
          ...this.state.selectedFields.slice(0, foundIndex),
          ...this.state.selectedFields.slice(foundIndex + 1),
        ];
      } else {
        selectedFields = [...this.state.selectedFields, field];
      }
    }
    const finalList = fields ? fields
      .filter(f => selectedFields.find(a => a === f)) : [];
    this.setState({ selectedFields: finalList, lastSelectedIndex });
  }

  render() {
    const items = this.props.fields.map((field, index) => (<Item
        name={field}
        key={index}
        selectedSource={this.props.id}
        addItemsToCart={this.props.addItemsToCart}
        selectedFields={this.state.selectedFields}
        handleSelection={this.handleItemSelection}
        index={index}
      />));
    return this.props.connectDropTarget(<div style={styles.content}> {items} </div>);
  }
}

Cart.propTypes = {
  id: PropTypes.string,
  fields: PropTypes.array,
  data: PropTypes.object,
  dragstarted: PropTypes.func,
  dragged: PropTypes.func,
  dragEnded: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  addItemsToCart: PropTypes.func,
};

const dropTarget = DropTarget;

export default dropTarget('ITEM', nodeTarget, collect)(Cart);
