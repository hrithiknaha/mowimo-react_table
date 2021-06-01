import React from "react";
import { connect } from "react-redux";

function RowSeven(props) {
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
					<h1>REACTION TO QUARTERLY FIGURES</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							This factor calculates how the price of the stock changed on the
							day of publication of the last quarterly figures compared to the
							benchmark index. The key figure results from the difference
							between the daily performance of the value considered and the
							index.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							Surprisingly positive or negative quarterly figures are reflected
							in the performance of the value on the trading day. Positive or
							negative messages are often followed by more positive or negative
							messages.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the adjusted performance is greater than
							1%.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the adjusted performance is between -1% and
							+1%.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the adjusted performance is less than -1%..
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>None</p>
					</div>
					<div className="modal-body-data">
						<h4>DATA FOR {props.data.data.sec_name}</h4>
						<p>
							Johnson & Johnson Close 19.04.2021: 162.690 USD Johnson & Johnson
							Close 20.04.2021: 166.480 USD Dow Jones Close 19.04.2021: 34077.63
							Dow Jones Close 20.04.2021: 33821.30 -- TO BE CHANGED
						</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table"></p>
						<p className="modal-table">
							{props.data.data.sec_name} Price reaction = <span>2.33 %</span>
						</p>
						<p className="modal-table">
							Dow Jones Reaction = <span>-0.75 %</span>
						</p>
						<p className="modal-table">
							Reaction to quaterly figures{" "}
							<span>{props.data.data.reaction_earnings_value}</span>
						</p>
						<p className="modal-table">
							Points
							<span className={`flag-modal-${color}`}>
								{props.data.data.pe_ratio_cy_score}
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
export default connect(mapStateToProps)(RowSeven);
