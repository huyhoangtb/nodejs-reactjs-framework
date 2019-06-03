import React, {Component} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Item from './item';


class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {learningItems, lectureMaterials} = this.props;
    this.setState({learningItems, lectureMaterials})
  }


  render() {
    const {learningItems, lectureMaterials} = this.state;
    const {refIndex} = this.props;
    let index = this.props.index || 1;
    return (
      <div>
        {learningItems && learningItems.map((item, index) => {
          if(!item) return;
          const itemData = lectureMaterials[item.iid];
          const children = item.children || [];
          const hasChildren = children.length > 0;
          const itemIndex = parseInt(`${refIndex}${index}`);
          return (

            <Draggable key={item.iid} draggableId={item.iid} index={itemIndex}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Item data={itemData} hasChildren={hasChildren}/>
                  {
                    hasChildren &&
                    <Droppable key={`${item.iid}.${refIndex}`} droppableId={`${item.iid}`}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          <Container refIndex={itemIndex} index={index++} key={itemData.iid} learningItems={children}
                                     lectureMaterials={lectureMaterials}/>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                  }

                </div>
              )}
            </Draggable>

          )
        })
        }
      </div>
    );
  }
}


export default Container;