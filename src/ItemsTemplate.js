import React from 'react';
import PropTypes from 'prop-types';

const getFieldStyle = (isDragging) => {
  const style = {
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 30,
    margin: 5,
    backgroundColor: 'pink',
  };
  style.opacity = isDragging ? 0.5 : 1;
  return style;
};

const ItemsTemplate = ({ fields }) => {
  const rows = fields.map(field => (<div key={field} style={getFieldStyle(false)}>
      {field}
    </div>));
  return (<div>{rows}</div>);
};

ItemsTemplate.propTypes = {
  fields: PropTypes.array,
};

export default ItemsTemplate;
