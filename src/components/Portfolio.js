import React, { useEffect } from "react";

import { connect } from "react-redux";

function Portfolio({ table }) {
	useEffect(() => {
		let portfolio = [];
		table.portfolio.map((stock) => {
			const stock_ticker = stock.split(",")[0];
			const each_stock = table.rows.filter(
				(row) => row.sec_ticker === stock_ticker
			);
			portfolio = [...portfolio, each_stock[0]];
			console.log(portfolio);
		});
	}, []);
	return (
		<div className="portfolio">
			<table className="sidebar-portfolio-table">
				<thead>
					<tr>
						<th>STOCK</th>
						<th>SCORE</th>
					</tr>
				</thead>
				<tbody>
					{table.hasPortfolio &&
						table.portfolio.map((stock) => {
							return (
								<tr key={stock}>
									<td className="td">{stock.split(",")[0]}</td>
									<td className="td">{stock.split(",")[1]}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

const mapStateToProps = (state) => ({
	table: state.table,
});

export default connect(mapStateToProps)(Portfolio);
