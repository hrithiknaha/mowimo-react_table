import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

//This is called as store, as it stores everything all the data coming from the backend in here. It is an upgraded version of the useState hooks, which also does the exact same thing, but using this store or redux helps to manage the states easily as compared to useState

const middleware = [thunk];
const store = createStore(
	rootReducer,

	compose(
		applyMiddleware(...middleware),
		//Use after using reduct chrome devtool
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
	)
);
export default store;
