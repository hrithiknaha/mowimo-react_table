import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import { TICKER_COLUMNS } from "../config/ticker-columns";

function Ticker() {
	const [data, setData] = useState({});
	const [isLoading, setLoading] = useState(true);

	const columns = useMemo(() => TICKER_COLUMNS, []);

	//Getting the paramater from the URL for ex, /score/AGM or /score/AAPL, so ticker will have AGM or AAPLE or any other ticker name depending on which URL it is going
	const { ticker } = useParams();

	//The translation function
	const { t } = useTranslation();

	//Fetching each ticker from api and setting it.
	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(
				`https://levermy.herokuapp.com/leverman/stock/${ticker}`
			);
			setData(response.data[0][0]);
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
