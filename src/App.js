import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Table from "./components/Table";
import Ticker from "./components/Ticker";
import Policy from "./components/Policy";
import Imprint from "./components/Imprint";
import StocksEarning from "./components/StocksEarning";
import { Provider } from "react-redux";
import store from "./store";

import "../src/styles/styles.scss";
import Sidebar from "./components/Sidebar";
import SidebarWrapper from "./components/SidebarWrapper";

//App Function passing in the i18n props to the table component
function App(props) {
	return (
		<Provider store={store}>
			<Router>
				<div className="app">
					<SidebarWrapper />
					<div className="section">
						<Switch>
							<Route path="/" exact>
								<Table i18n={props.i18n} />
							</Route>
							<Route path="/dowjones" exact>
								<Table i18n={props.i18n} />
							</Route>
							<Route path="/nasdaq" exact>
								<Table i18n={props.i18n} />
							</Route>
							<Route path="/sp500" exact>
								<Table i18n={props.i18n} />
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
