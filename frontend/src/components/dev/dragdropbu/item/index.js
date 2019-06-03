import React, {Component} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import Loadable from "react-loadable";
import Loading from "components/common/viewers/loading";

const getItemStyle = (itemSpace, isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: itemSpace * 2,
  margin: `0 0 ${itemSpace}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  // styles we need to apply on draggables
  ...draggableStyle
});

class DraggableItem extends Component {

  render() {
    const {style, className, data, itemSpace, index, providedShared} = this.props;

    return (
      <Draggable key={data.iid} draggableId={data.iid} index={index}>
        {(provided, snapshot) => {
          console.log('provided', provided);
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps}
                 style={getItemStyle(itemSpace, snapshot.isDragging, provided.draggableProps.style)}
                 className={className}>
              {data.content}
              {this.props.children}
            </div>
          )
        }}
      </Draggable>
    );
  }
}

DraggableItem.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  className: PropTypes.string,
  itemSpace: PropTypes.number
}

export default DraggableItem;