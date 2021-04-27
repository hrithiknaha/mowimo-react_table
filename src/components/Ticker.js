import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Ticker() {
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);

	const { ticker } = useParams();
	console.log(data);
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				`https://mysql-test-2021.herokuapp.com/score/${ticker}`
			);
			setData(response.data[0]);
			setLoading(false);
		}

		fetchData();
	}, []);
	return <>{!isLoading && <span>{data.sec_ticker}</span>}</>;
}

export default Ticker;
