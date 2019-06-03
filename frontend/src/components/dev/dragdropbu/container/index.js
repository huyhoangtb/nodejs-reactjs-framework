import React, {Component} from "react";
import Item from '../item';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

class DragdropContainer extends Component {

  render() {
    const {items, onDragEnd, getListStyle, providedShared} = this.props;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Item itemSpace={8} index={index} key={item.iid} data={item}>
                  fadfadfadsf
                </Item>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


export default DragdropContainer;