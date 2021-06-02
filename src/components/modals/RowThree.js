import React from "react";
import { connect } from "react-redux";

function RowThree(props) {
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
					<h1>EQUITY RATIO</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							The equity ratio is a business ratio that reflects the ratio of
							equity to the total capital of a business. .
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							The equity ratio is the most important balance sheet key figure
							that provides information about the capital structure of a
							company. It is important for the creditworthiness of a company.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the equity ratio is greater than 25%..
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the equity ratio is between 15% and 25%.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the equity ratio is less than 15%.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>
							For financial assets, the valuation criteria are different because
							they have a high leverage. Financials receive a plus when their
							equity ratio is greater than 10%. It receives a minus when its
							equity ratio is less than 5%. If the equity ratio is between 5%
							and 10%, the value is 0 points.
						</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table">
							Last Year <span>2020</span>
						</p>
						<p className="modal-table">
							Equity ratio
							<span>{props.data.data.equity_ratio_value}</span>
						</p>
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.equity_ratio_score}
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
export default connect(mapStateToProps)(RowThree);
