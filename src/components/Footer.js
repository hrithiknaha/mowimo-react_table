import React from "react";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="footer">
			<div className="footer-links">
				<Link to="/policy">Privacy Policy</Link>
				<p>|</p>
				<Link to="/imprint">Imprint</Link>
			</div>
		</div>
	);
}

export default Footer;
