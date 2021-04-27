import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Ticker() {
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);

	const { ticker } = useParams();

	//Fetching each ticker from api and setting it.
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
	return (
		<>
			{!isLoading && (
				<div className="container ticker">
					<table>
						<thead>
							<tr>
								<th>Sector</th>
								<th>ISIN</th>
								<th>ROE SCORE</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.sector}</td>
								<td>{data.isin}</td>
								<td>{data.roe_score}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default Ticker;
