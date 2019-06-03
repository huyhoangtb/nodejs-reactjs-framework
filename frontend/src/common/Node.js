export const getNodeByIid = (iid, nodes = []) => {
  nodes = nodes || [];

  iid = parseInt(iid);
  for (let i = 0; i < nodes.length; i++) {
    if(nodes[i].iid === iid) {
      return nodes[i];
    }
  }
  return null;
}