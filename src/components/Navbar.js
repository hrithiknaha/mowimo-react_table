import React from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import Filter from "./Filter";

function Navbar({ filter, setFilter, index, earnings }) {
	const { t } = useTranslation();

	console.log(earnings);
	return (
		<div className="navbar">
			<Filter filter={filter} setFilter={setFilter} />

			{!earnings.onEarning && (
				<div className="navbar-links">
					<Link to={`/stock/earnings/${index}`}>{t("Stock Earning")}</Link>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	earnings: state.earnings,
});

export default connect(mapStateToProps)(Navbar);
