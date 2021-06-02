import React from "react";
import { connect } from "react-redux";

function RowEleven(props) {
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
					<h1>PRICE MOMENTUM</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							This key figure is used to calculate whether there has been a
							trend reversal.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							Trend reversals for the better are rewarded. Turning to the
							negative will be punished.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if factor 9 = +1 und factor 10 = 0 oder -1.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if factor 9 = -1 and factor 10 = 0 or +1.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>in all other cases. period.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>None</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table">
							Factor 9<span></span>
						</p>
						<p className="modal-table">
							Factor 10<span></span>
						</p>
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.price_momentum_score}
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
export default connect(mapStateToProps)(RowEleven);
