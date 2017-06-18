import React from 'react';
import PropTypes from 'prop-types';
import ItemsTemplate from './ItemsTemplate';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const getFieldStyle = (isDragging) => {
  const style = {
    width: 300,
    maxWidth: 300,
  };
  style.opacity = isDragging ? 0.8 : 1;
  return style;
};

const getItemStyles = (props) => {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const collect = (monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

class FieldDragLayer extends React.Component {
  renderItem(type, item) {
    switch (type) {
      case 'ITEM':
        return (
          <ItemsTemplate fields={item.fields} />
        );
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <div style={getFieldStyle(this.props.isDragging)}>
            {this.renderItem(itemType, item)}
          </div>
        </div>
      </div>
    );
  }
}

FieldDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  initialOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  isDragging: PropTypes.bool.isRequired,
};
const dragLayer = DragLayer;
export default dragLayer(collect)(FieldDragLayer);
