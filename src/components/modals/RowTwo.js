import React from "react";
import { connect } from "react-redux";

function RowTwo(props) {
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
					<h1>EBIT-MARGIN CY</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							The EBIT-margin is a business measure that makes statements about
							the profitability of companies. It results from the quotient of
							EBIT and sales..
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							High EBIT-margins are a quality criterion for the investment risk.
							The higher the EBIT-margin, the easier it will be to cope with
							sales declines economically.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the EBIT-margin is greater than 12%.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the EBIT-margin is greater than 12%.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the EBIT-margin is less than 6%.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>
							For financial assets, this criterion is not applicable according
							to Levermann. By default, financials get 0 points.
						</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table">
							Last Year <span>2020</span>
						</p>
						<p className="modal-table">
							EBIT-Margin
							<span>{props.data.data.ebit_margin_value}</span>
						</p>
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.ebit_margin_score}
							</span>
						</p>
					</div>
					<div className="footer">
						<button onClick={props.onClose}>Close</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	data: state.table,
});
export default connect(mapStateToProps)(RowTwo);
