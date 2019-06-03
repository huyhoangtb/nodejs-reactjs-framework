// disabling flowtype to keep this example super simple
/* eslint-disable flowtype/require-valid-file-annotation */

import React, {Component} from 'react';
import {Typography} from 'antd';
import PropTypes from 'prop-types';
import contentEditable from '../input-editable';
import {getItemStyle, getNodeInTreeByIid} from '../common'
import {Draggable} from 'react-beautiful-dnd';

const {Paragraph} = Typography;

export default class DraggableWrapper extends Component {

  render() {
    let node = this.props.node || {};
    const {isDragDisabled, index, draggableId, type} = this.props
    let EditableDIV = contentEditable('span');
    return (
      <Draggable type={type} isDragDisabled={isDragDisabled} key={node.iid} draggableId={node.iid || draggableId}
                 index={index}>
        {(draggableProvided, draggableSnapshot) => {
          return (
            <div ref={draggableProvided.innerRef}
                 {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}
                 style={{
                   ...getItemStyle(draggableSnapshot.isDragging, draggableProvided.draggableProps.style,
                   )
                 }}>
                <EditableDIV className='ui-editable-comp' value={node.name}/>
              {this.props.children}
            </div>
          )
        }}
      </Draggable>
    );
  }
}


DraggableWrapper.propTypes = {
  node: PropTypes.object,
  index: PropTypes.number,
  isDragDisabled: PropTypes.bool,
  draggableId: PropTypes.string,
}