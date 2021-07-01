import React from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import Filter from "./Filter";
import Dropdown from "./Dropdown";

function Navbar({ filter, setFilter, index, earnings }) {
	const { t } = useTranslation();

	return (
		<div className="navbar">
			<Filter filter={filter} setFilter={setFilter} />
			<Dropdown />
		</div>
	);
}

const mapStateToProps = (state) => ({
	earnings: state.earnings,
});

export default connect(mapStateToProps)(Navbar);
