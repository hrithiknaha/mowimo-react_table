import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Table from "./components/Table";
import Ticker from "./components/Ticker";

import "../src/styles/styles.scss";

function App({ i18n }) {
	const [rows, setRowsData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	//Calling the api once the page renders, and to avoid showing error, loading boolean has been used, So while the data is being fetched page will be loading
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
					{!isLoading && <Table ROWS={rows} i18n={i18n} />}
				</Route>
				<Route path="/score/:ticker" exact component={Ticker} />
			</Switch>
		</Router>
	);
}

export default App;
