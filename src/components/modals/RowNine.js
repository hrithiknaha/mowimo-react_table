import React from "react";
import { connect } from "react-redux";

function RowNine(props) {
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
					<h1>PRICE TODAY VS. PRICE 6 MONTHS AGO</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							The difference between the price 6 months ago and today's price is
							calculated.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							A stock that has changed more than +5% or -5% over a given period
							will likely continue to move in the same direction.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the price has risen by more than +5% over
							the period.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the price has changed in the period between
							-5% and + 5%.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the price fell more than -5% over the
							period.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>None</p>
					</div>
					<div className="modal-body-data">
						<h4>DATA FOR {props.data.data.sec_name}</h4>
						<p>
							Price On {props.data.data.today}: {props.data.data.last_price}
						</p>
						<p>
							Price On {props.data.data.six_months_date}:{" "}
							{props.data.data.price_6_months_ago}
						</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table"></p>
						<p className="modal-table">
							Price today vs. Price 6 months ago ={" "}
							<span>{props.data.data.price_today_vs_6_months_value}</span>
						</p>
						<p className="modal-table">
							Points
							<span className={`flag-modal-${color}`}>
								{props.data.data.price_today_vs_6_months_score}
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
export default connect(mapStateToProps)(RowNine);
