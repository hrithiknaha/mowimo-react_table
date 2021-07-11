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

	function downloadContent(name, content) {
		let atag = document.createElement("a");
		let file = new Blob([content]);
		atag.href = URL.createObjectURL(file);
		atag.download = name;
		atag.click();
		console.log(file.type);
	}

	const handleDownloadCookies = () => {
		let portfolios = JSON.parse(localStorage.getItem("portfolioToken"));
		let portfolioText = "Liked Stocks Information \n";
		if (portfolios) {
			portfolios.map((ticker) => {
				// console.log(ticker);
				let tickerText = ticker.split(",")[0];
				let tickerScore = ticker.split(",")[1];
				let string = `Stock ${tickerText} with total score of ${tickerScore} \n`;
				portfolioText = portfolioText + string;
			});
		} else portfolioText = "No Liked Stocks";

		let colorText = `\n\nCookies with color option : ${document.cookie}`;
		let string = portfolioText + colorText;
		downloadContent("cookies", string);
	};

	const handleDeleteCookies = () => {
		delete_cookie("color");
		localStorage.removeItem("like");
		localStorage.removeItem("portfolioToken");
		window.location.reload();
	};

	return (
		<div className="no-align">
			<img src={profile} className="dropdown" onClick={handleMenuShow} />

			<div
				className={menuShown ? "dropdown-wrapper" : "dropdown-wrapper hidden"}
			>
				<Link to="#" onClick={deleteCookie} className="dropdown-wrapper_text">
					Change Color
				</Link>

				<Link to="#" className="dropdown-wrapper_text">
					Upgrade to Premium
				</Link>

				<Link
					to="#"
					onClick={handleDownloadCookies}
					className="dropdown-wrapper_text"
				>
					Download Cookie info
				</Link>

				<Link
					to="#"
					onClick={handleDeleteCookies}
					className="dropdown-wrapper_text"
				>
					Delete Cookies
				</Link>
			</div>
		</div>
	);
}

export default Dropdown;
