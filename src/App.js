import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import BasicTable from "./components/BasicTable";

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
	return <div>{!isLoading && <BasicTable ROWS={rows} />}</div>;
}

export default App;
