import React, { useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//This is used for Front end routing. The parent must be Browserrouter is we are using redux then BrowserRouter would go second.
//Switch and Route helps to decide which component is to be sent when the user goes on one particular route.

import Table from "./components/Table";
import Ticker from "./components/Ticker";
import Policy from "./components/Policy";
import Imprint from "./components/Imprint";
import StocksEarning from "./components/StocksEarning";
import SidebarWrapper from "./components/SidebarWrapper";
import DowJones from "./components/DowJones";
import Nasdaq from "./components/Nasdaq";
import SP500 from "./components/SP500";
import Portfolio from "./components/Portfolio";
//The above components are the individual components written inside the components folder. All the logic is written separately
//And then they are called in the App.js to be rendered. Mind that these the parent level component and not child level component like Filter, hence only parent level components are called here.

import { Provider } from "react-redux";
import store from "./store";
//These two are related to redux, the store is the store of the redux or the frontend DB, and the providider is the implementation
//function of the store. When using redux, the Provider would be the parent element to be rendered out, and all the other components goes inside it.

import "../src/styles/styles.scss";
// Importing the Styles. all the separate styles are written in styles.scss and hence by just importing that we get all the styles.

//App Function passing in the i18n props to the table component
function App(props) {
	//This is the second file but the main functioning file which gets called when the app is working. Here we are storing the color from our modal into a state which then is passed in line 35 for thr gradient effect

	const [color, setColor] = useState(document.cookie.split("=")[1]);
	const handleColor = (c) => {
		setColor(c);
	};
	//This is just a implementation of setting the color with cookies. The default value is taken from the cookies, that is what is
	//written inside the useStat(). THe string returned from cokkies is split on = and the second value from the split is the color,
	//hence that is taken as default, if nothing comes up that is the user is coming to the website for the first time then it would,
	//return null

	//Below are all the routes which makes our app works, You could see the path and the corresponding component to fire when the user visits the path
	return (
		<Provider store={store}>
			<Router>
				<div className="app">
					<SidebarWrapper />
					<div
						style={{
							backgroundImage: `linear-gradient(to bottom,0 300, ${color}, #121212)`,
							marginLeft: "15rem",
							backgroundImage: `-webkit-gradient(linear, left top, 0 250, from(${color}), to(#121212))`,
						}}
						className="section"
					>
						<Switch>
							<Route path="/" exact>
								<Table i18n={props.i18n} handleColor={handleColor} />
							</Route>
							<Route path="/dowjones" exact>
								<DowJones i18n={props.i18n} handleColor={handleColor} />
							</Route>
							<Route path="/nasdaq" exact>
								<Nasdaq i18n={props.i18n} handleColor={handleColor} />
							</Route>
							<Route path="/sp500" exact>
								<SP500 i18n={props.i18n} handleColor={handleColor} />
							</Route>
							<Route path="/score/:ticker" exact component={Ticker} />
							<Route path="/policy" exact component={Policy} />
							<Route path="/imprint" exact component={Imprint} />
							<Route path="/portfolio" exact component={Portfolio} />
							<Route path="/stocks/earning" exact component={StocksEarning} />
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
