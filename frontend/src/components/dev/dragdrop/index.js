// disabling flowtype to keep this example super simple
/* eslint-disable flowtype/require-valid-file-annotation */

import React, {Component} from 'react';
import Curriculum from './curriculum';
import RecursiveDragDrop from './recursive-drag-drop';
import {reorder, reorderAtRoot, flatCurriculum} from './common'
import DroppableWrapper from './wrapper/DroppableWrapper';
import {DragDropContext} from 'react-beautiful-dnd';
import './stylesheet.css';

export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    const {nodes, lastIndex} = flatCurriculum(Curriculum.learningItems, Curriculum.lectureMaterials);
    this.state = {nodes: [...nodes]};
  }

  isRoot(result) {
    const {destination, source} = result;
    if (!destination || !source || (destination.droppableId !== source.droppableId)) {
      return false
    }
    return isNaN(parseFloat(destination.droppableId)) && !isFinite(destination.droppableId);
  }

  onDragEnd = (result) => {
    const {destination, source} = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    let nodes;
    if (this.isRoot(result)) {
      nodes = reorderAtRoot(this.state.nodes, source.index, destination.index);
    } else {
      nodes = reorder(
        this.state.nodes,
        source,
        destination,
      );
    }

    this.setState({nodes});
  }

  render() {
    let nodes = this.state.nodes || [];
    nodes = [...nodes];
    let i = 0;
    return (
      <div className='ui-drag-drop-root'>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DroppableWrapper droppableId='draggableId'>
          <RecursiveDragDrop treeNodes={nodes}/>
        </DroppableWrapper>
      </DragDropContext>
      </div>
    );
  }
}