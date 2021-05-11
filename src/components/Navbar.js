import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navbar() {
	const { t } = useTranslation();
	return (
		<div className="container navbar">
			<div className="navbar-logo">
				<Link to="/">
					<AiOutlineStock />
				</Link>
			</div>
			<div className="navbar-links">
				<Link to="stocks-earning">{t("Stock Earning")}</Link>
			</div>
		</div>
	);
}

export default Navbar;
