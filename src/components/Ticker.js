import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Ticker() {
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);

	const { ticker } = useParams();

	const { t } = useTranslation();

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
	}, [ticker]);
	return (
		<>
			{!isLoading && (
				<div className="container ticker">
					<table>
						<thead>
							<tr>
								<th>{t("Sector")}</th>
								<th>{t("ISIN")}</th>
								<th>{t("Industry")}</th>
								<th>{t("Total")}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{data.sector}</td>
								<td>{data.isin}</td>
								<td>{data.industry}</td>
								<td>{data.end_score}</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}

export default Ticker;
