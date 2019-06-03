import React, {Component} from 'react';
import DraggableWrapper from './wrapper/DraggableWrapper';
import DroppableWrapper from './wrapper/DroppableWrapper';

export default class RecursiveDragDrop extends Component {

  render() {
    let treeNodes = this.props.treeNodes || [];
    let node = this.props.node || {};
    return (
      <div>
        {treeNodes.map((node, index) => (
          <div className={`${node.children && node.children.length > 0 ? 'ui-drop-panel' : ''}`} key={node.iid}>
            <DraggableWrapper node={node} index={index}>
              {node.children && node.children.length > 0 && (

                <DroppableWrapper node={node} type='child'>
                  <RecursiveDragDrop node={node} treeNodes={node.children}/>
                </DroppableWrapper>

              )}
            </DraggableWrapper>
          </div>
        ))
        }
        <DraggableWrapper isDragDisabled={true} draggableId={`add_to:${node.iid || 'root'}`} index={treeNodes.length}>
          add more
        </DraggableWrapper>
      </div>
    );
  }
}