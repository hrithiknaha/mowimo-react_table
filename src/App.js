import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Table from "./components/Table";
import Ticker from "./components/Ticker";
import Policy from "./components/Policy";
import Imprint from "./components/Imprint";
import StocksEarning from "./components/StocksEarning";

import "../src/styles/styles.scss";

//App Function passing in the i18n props to the table component
function App({ i18n }) {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Table i18n={i18n} />
				</Route>
				<Route path="/dowjones">
					<Table i18n={i18n} />
				</Route>
				<Route path="/nasdaq">
					<Table i18n={i18n} />
				</Route>
				<Route path="/sp500">
					<Table i18n={i18n} />
				</Route>
				<Route path="/score/:ticker" exact component={Ticker} />
				<Route path="/policy" component={Policy} />
				<Route path="/imprint" component={Imprint} />
				<Route path="/stocks/earning" component={StocksEarning} />
			</Switch>
		</Router>
	);
}

export default App;
