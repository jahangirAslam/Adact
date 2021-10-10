import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from "connected-react-router";
import rootReducer from './rootReducer'

export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const store = configureStore({
    reducer: combineReducers({ router: connectRouter(history), ...rootReducer }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routeMiddleware),
})

export default store