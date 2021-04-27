import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Table from "./components/Table";
import Ticker from "./components/Ticker";

import "../src/styles/styles.scss";

function App() {
	const [rows, setRowsData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const result = await axios.get(
				"https://mysql-test-2021.herokuapp.com/scores"
			);
			setRowsData(result.data);
			setLoading(false);
		}
		fetchData();
	}, []);

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					{!isLoading && <Table ROWS={rows} />}
				</Route>
				<Route path="/score/:ticker" exact component={Ticker} />
			</Switch>
		</Router>
	);
}

export default App;
