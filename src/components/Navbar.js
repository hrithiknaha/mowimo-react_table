import React from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Filter from "./Filter";

function Navbar({ filter, setFilter }) {
	const { t } = useTranslation();
	return (
		<div className="container navbar">
			<Filter filter={filter} setFilter={setFilter} />
			<div className="navbar-links">
				<Link to="stocks-earning">{t("Stock Earning")}</Link>
			</div>
		</div>
	);
}

export default Navbar;
