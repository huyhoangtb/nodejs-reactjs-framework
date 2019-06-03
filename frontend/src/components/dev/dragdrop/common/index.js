import {getNodeByIid} from 'common/Node';

// a little function to help us with reordering the result
export const reorderAtRoot = (nodeTree,startIndex, endIndex) => {
  const [removed] = nodeTree.splice(startIndex, 1);
  nodeTree.splice(endIndex, 0, removed);


  return nodeTree;
};

// a little function to help us with reordering the result
export const reorder = (nodeTree, source, destination) => {
  const removeNodeResult = deleteNodeOnTree(nodeTree, source.droppableId, source.index);
  const newTreeData = addNodeOnTree(removeNodeResult.treeData, destination.droppableId, removeNodeResult.deletedNode, destination.index)
  // const [removed] = result.splice(startIndex, 1);
  // result.splice(endIndex, 0, removed);

  console.log('removeNodeResult.treeData', newTreeData);

  // console.log(reindexTreeData(removeNodeResult.treeData).nodes);
  return newTreeData;
};

export const disableChildrenWhenDragging = (nodeTree, iid, lastIndex, isDisabled) => {
  const nodes = [];
  if (lastIndex === undefined) {
    lastIndex = 0;
  }

  nodeTree.map((item, index) => {
    const node = {...item};
    node.index = lastIndex;
    node.isDisabled = isDisabled;
    lastIndex++;

    let children = item.children || [];
    if (children.length > 0) {
      if (node.iid === iid) {
        isDisabled = true;
        node.disableChildren = isDisabled;
      }
      const indexedData = disableChildrenWhenDragging(children, iid, lastIndex, isDisabled);
      node.children = indexedData.nodes;
      lastIndex = indexedData.lastIndex;
    }
    nodes.push(node)
  });

  return {nodes, lastIndex};
};

export const getNodeInTreeByIid = (treeData, iid) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    const children = node.children || [];

    if (node.iid === iid) {
      return node
    }
    if (children.length > 0) {
      return getNodeInTreeByIid(children, iid);
    }
  }
}


export const getItemStyle = (isDragging, draggableStyle, grid = 8) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid, //*2
  margin: `${grid}px`,
  border: '1px solid #cccccc',
  // height: 30,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '#ffffff',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver, overflow, grid = 8) => ({
  background: isDraggingOver ? 'lightblue' : '#f1f1f1',
  // padding: grid,
  border: '1px solid #cccccc',
  // maxHeight: '50vh',
  overflow,
  minHeight: '20px'
});

/**
 * this function will add the node to the parent node at position index
 *
 * @param treeData
 * @param parentIid
 * @param node
 * @param index
 * @returns {Array}
 */
// addNodeOnTree(removeNodeResult.treeData, destination.droppableId, removeNodeResult.deletedNode, destination.index)
export const addNodeOnTree = (treeData, parentIid, nodeToAdd, index) => {
  const newTreeData = [];
  treeData.map(node => {
    const newNode = {...node};
    newNode.isDisabled = false;
    const children = newNode.children || [];

    if (node.iid === parentIid) {
      children.splice(index, 0, nodeToAdd);
      console.log('children', children, nodeToAdd)
      newNode.children = children;
      newTreeData.push(newNode);
      return;
    }
    if (children.length > 0) {
      newNode.children = addNodeOnTree(children, parentIid, nodeToAdd, index);
    }
    newTreeData.push(newNode);
  });

  return newTreeData;
}

export const deleteNodeOnTree = (treeData, parentIid, index) => {
  const newTreeData = [];
  treeData = treeData || [];
  let deletedNode;
  treeData.map(node => {
    const newNode = {...node};
    const children = newNode.children || [];
    if (node.iid === parentIid) {
      deletedNode = children.splice(index, 1)[0];
      newTreeData.push(newNode);
      return;
    }

    if (children.length > 0) {
      const findOnSubNodeResult = deleteNodeOnTree(children, parentIid, index);
      newNode.children = findOnSubNodeResult.treeData;
      if (findOnSubNodeResult.deletedNode) {
        deletedNode = findOnSubNodeResult.deletedNode;
      }
    }
    newTreeData.push(newNode);

  });
  return {deletedNode, treeData: newTreeData};
}

export const flatCurriculum = (learningItems, lectureMaterials, lastIndex) => {
  const nodes = [];
  if (lastIndex === undefined) {
    lastIndex = 0;
  }
  learningItems.map((item, index) => {
    const iid = item.iid || item.id;
    const node = getNodeByIid(iid, lectureMaterials);

    let children = item.children || [];

    // if(children.length == 0) {
    node.index = lastIndex;
    node.rindex = index;
    lastIndex++;
    // }

    if (children.length > 0) {
      const flatData = flatCurriculum(children, lectureMaterials, lastIndex);
      node.children = flatData.nodes;
      lastIndex = flatData.lastIndex;
    }
    nodes.push({
      ...item,
      ...node
    })
  });
  return {nodes, lastIndex};
}

