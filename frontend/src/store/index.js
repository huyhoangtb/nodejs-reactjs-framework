import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { createBrowserHistory } from 'history'
import {devToolsEnhancer} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import {autoRehydrate, persistStore} from 'redux-persist';
import mySaga from 'sagas/';
import reducers from 'reducers/index';
import {blacklist, whitelist} from 'reducers/persist-keys';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

export const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

const Store = createStore(rootReducer, undefined,
  compose(
    autoRehydrate(), // auto persistence
    applyMiddleware(historyMiddleware),
    applyMiddleware(sagaMiddleware),
    devToolsEnhancer ? devToolsEnhancer() : (f) => f),
);

sagaMiddleware.run(mySaga);
// begin periodically persisting the store
persistStore(Store, {whitelist, blacklist});

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: Store.getState()
});

export default Store;
