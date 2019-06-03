export const contextActionTypes = {
  LOAD_APP_CONTEXT: 'LOAD_APP_CONTEXT',
  SET_APP_CONTEXT: 'SET_APP_CONTEXT'
}

export default {
  getApplicationContext() {
    return {type: contextActionTypes.LOAD_APP_CONTEXT};
  },
  setApplicationContext(context) {
    return {type: contextActionTypes.SET_APP_CONTEXT, context};
  }
};
