import React from "react";
import { connect } from "react-redux";

function RowFive(props) {
	if (props.show) return null;

	// The gray background
	const backdropStyle = {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0,0,0,0.3)",
		padding: 50,
	};

	// The modal "window"
	const modalStyle = {
		backgroundColor: "#fff",
		borderRadius: 5,
		maxWidth: 500,
		minHeight: 300,
		margin: "0 auto",
		padding: 30,
	};

	let color = null;
	if (props.final_score >= 4) color = "green";
	else if (props.final_score === 3) color = "grey";
	else color = "red";

	return (
		<div className="backdrop" style={{ backdropStyle }}>
			<div className="modal" style={{ modalStyle }}>
				<div className="modal-body">
					<h1>P/E RATIO CY</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							The Price-Earnings-Ratio (P/E ratio) is an economic indicator for
							the valuation of equities. For this purpose, the price of the
							share is set in relation to the earnings per share determined or
							expected for a comparative period.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							The P/E ratio indicates at what multiple of its expected earnings
							a stock is currently being valued on the stock exchange. In other
							words, the P/E ratio indicates after how many years the company's
							profit has paid the price of the stock.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the P/E ratio is less than 12 but greater
							than 0. than 0.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the P/E ratio is between 12 and 16.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the P/E ratio is greater than 16 or less
							than 0.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>None</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table"></p>
						<p className="modal-table">
							P/E Ratio
							<span>{props.data.data.pe_ratio_cy_value}</span>
						</p>
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.pe_ratio_cy_score}
							</span>
						</p>
					</div>
					<div className="footer">
						<button onClick={props.onClose} className="modal-button">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	data: state.table,
});
export default connect(mapStateToProps)(RowFive);
