import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
	const { t } = useTranslation();
	return (
		<div className="footer">
			<div className="footer-links">
				<Link to="/policy">{t("Privacy Policy")}</Link>
				<p>|</p>
				<Link to="/imprint">{t("Imprint")}</Link>
			</div>
		</div>
	);
}

export default Footer;
