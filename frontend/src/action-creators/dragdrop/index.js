export const DRAG_DROP_SET_SELECTED_ITEMS = 'DRAG_DROP_SET_SELECTED_ITEMS';
export const DRAG_DROP_SET_STARTED_ZONE = "DRAG_DROP_SET_STARTED_ZONE";
export const SET_TYPE_OF_BROWSER = "SET_TYPE_OF_BROWSER";
export const SET_DATA_TRANSFER = "SET_DATA_TRANSFER";

export function dragDropSetSelectedItems(selectedItems) {
  return {type: DRAG_DROP_SET_SELECTED_ITEMS, selectedItems};
}

export function dragDropSetStartedZone(startedZone) {
  return {type: DRAG_DROP_SET_STARTED_ZONE, startedZone};
}

export function setTypeOfBrowser(browserType) {
  return {type: SET_TYPE_OF_BROWSER, browserType};
}

export function setDataTransfer(dataTransfer) {
  return {type: SET_DATA_TRANSFER, dataTransfer};
}
