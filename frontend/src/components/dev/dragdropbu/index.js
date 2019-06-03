import React, {Component} from "react";
import ReactDOM from "react-dom";
import Item from './item';
import Container from './container';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Loading from "components/common/viewers/loading";
import Loadable from "react-loadable";

// fake data generator
const getItems = count =>
  Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k}`,
    index: k,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  // width: 250
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(5)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className={'m-t-20'}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Item itemSpace={8} index={index} key={item.id} data={item}>
                  <Container providedShared={provided} items={this.state.items} onDragEnd={this.onDragEnd} getListStyle={getListStyle}/>
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


export default App;