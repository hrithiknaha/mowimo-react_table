import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

//This is called as store, as it stores everything all the data coming from the backend in here. It is an upgraded version of the useState hooks, which also does the exact same thing, but using this store or redux helps to manage the states easily as compared to useState

//A thunk is another word for a function. But it’s not just any old function. It’s a special (and uncommon) name for a function that’s returned by another function.
//As a higher order function(a function calling another function), this is the reason why we have two arrow functions in our actions.
//The first function is getting called from the components, and it is used to pass any parameter that can be used in the action, and the second function is the dispatch
//method, used to call the reducers.
//For actions to make this possible we had to use a middleware - thunk
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
