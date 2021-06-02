import React from "react";

import { connect } from "react-redux";

function Portfolio({ table }) {
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
