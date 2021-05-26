import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Table from "./components/Table";
import Ticker from "./components/Ticker";
import Policy from "./components/Policy";
import Imprint from "./components/Imprint";
import StocksEarning from "./components/StocksEarning";
import { Provider } from "react-redux";
import store from "./store";

import "../src/styles/styles.scss";
import SidebarWrapper from "./components/SidebarWrapper";
import DowJones from "./components/DowJones";
import Nasdaq from "./components/Nasdaq";
import SP500 from "./components/SP500";

//App Function passing in the i18n props to the table component
function App(props) {
	const [color, setColor] = useState(document.cookie.split("=")[1]);
	const handleColor = (c) => {
		setColor(c);
	};

	console.log(color);

	return (
		<Provider store={store}>
			<Router>
				<div className="app">
					<SidebarWrapper />
					<div
						style={{
							backgroundImage: `linear-gradient(to right, ${color}, #000)`,
						}}
						className="section"
					>
						<Switch>
							<Route path="/" exact>
								<Table i18n={props.i18n} handleColor={handleColor} />
							</Route>
							<Route path="/dowjones" exact>
								<DowJones i18n={props.i18n} />
							</Route>
							<Route path="/nasdaq" exact>
								<Nasdaq i18n={props.i18n} />
							</Route>
							<Route path="/sp500" exact>
								<SP500 i18n={props.i18n} />
							</Route>
							<Route path="/score/:ticker" exact component={Ticker} />
							<Route path="/policy" exact component={Policy} />
							<Route path="/imprint" exact component={Imprint} />
							<Route path="/stocks/earning" exact component={StocksEarning} />
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
