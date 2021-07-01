import { Link } from "react-router-dom";
import { useState } from "react";

import profile from "../assets/profile.png";

function Dropdown() {
	const [menuShown, setMenuShown] = useState(false);

	const handleMenuShow = () => {
		setMenuShown(!menuShown);
	};

	var delete_cookie = function (name) {
		console.log(name);
		document.cookie =
			name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	};

	const deleteCookie = () => {
		delete_cookie("color");
		window.location.reload();
	};

	return (
		<div className="no-align">
			<img src={profile} className="dropdown" onClick={handleMenuShow} />

			<div
				className={menuShown ? "dropdown-wrapper" : "dropdown-wrapper hidden"}
			>
				<Link onClick={deleteCookie} className="dropdown-wrapper_text">
					Change Color
				</Link>

				<Link link="#" className="dropdown-wrapper_text">
					Upgrade to Premium
				</Link>

				<Link className="dropdown-wrapper_text">Download Cookies</Link>
			</div>
		</div>
	);
}

export default Dropdown;
