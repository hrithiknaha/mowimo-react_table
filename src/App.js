import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Table from "./components/Table";
import Ticker from "./components/Ticker";
import Footer from "./components/Footer";
import Policy from "./components/Policy";
import Imprint from "./components/Imprint";

import "../src/styles/styles.scss";
import Navbar from "./components/Navbar";

//App Function passing in the i18n props to the table component
function App({ i18n }) {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/" exact>
					<Table i18n={i18n} />
				</Route>
				<Route path="/score/:ticker" exact component={Ticker} />
				<Route path="/policy" component={Policy} />
				<Route path="/imprint" component={Imprint} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
