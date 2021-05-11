import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="container navbar">
			<div className="navbar-logo">
				<Link to="/">
					<AiOutlineStock />
				</Link>
			</div>
			<div className="navbar-links">
				<Link to="stocks-earning">Stocks Earning</Link>
			</div>
		</div>
	);
}

export default Navbar;
