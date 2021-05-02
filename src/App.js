import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Table from "./components/Table";
import Ticker from "./components/Ticker";

import "../src/styles/styles.scss";

//App Function passing in the i18n props to the table component
function App({ i18n }) {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Table i18n={i18n} />
				</Route>
				<Route path="/score/:ticker" exact component={Ticker} />
			</Switch>
		</Router>
	);
}

export default App;
