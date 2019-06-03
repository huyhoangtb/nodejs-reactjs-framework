import React, {Component} from "react";
import Container from './container';
import Item from './container/item';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Syllabus from './curriculum';
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {Syllabus}
  }

  componentDidMount() {
    const {learningItems, lectureMaterials} = Syllabus;
    this.setState({learningItems, lectureMaterials})
  }


  onDragEnd = (result) => {
    console.log(result)
    let {learningItems, lectureMaterials} = this.state;
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    learningItems = reorder(
      learningItems,
      result.source.index,
      result.destination.index
    );

    this.setState({
      learningItems
    });
  }

  render() {
    const {learningItems, lectureMaterials} = this.state;
    return (
      <div className='ui-draggable-droppable'>fadsfads
        <DragDropContext onDragEnd={this.onDragEnd}>
          {learningItems && learningItems.map((item, index) => {
            if (!item) return;
            const itemData = lectureMaterials[item.iid];
            const children = item.children || [];
            const hasChildren = children.length > 0;
            return (
              <Droppable key={`${item.iid}.${index}`} droppableId={`${item.iid}`}>
                {(provided, snapshot) =>
                  <div ref={provided.innerRef} {...provided.droppableProps}>

                    <Draggable draggableId={item.iid} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Item data={itemData} hasChildren={hasChildren} {...provided.dragHandleProps}/>
                          <Container learningItems={children} refIndex={index} lectureMaterials={lectureMaterials}/>
                        </div>
                      )}
                    </Draggable>

                    {provided.placeholder}
                  </div>

                }
              </Droppable>)
          })}

        </DragDropContext>
      </div>
    );
  }
}


export default App;