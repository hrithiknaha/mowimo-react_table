import React from "react";
import { connect } from "react-redux";

function RowEight(props) {
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
					<h1>PROFIT REVISION</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							The difference between the analysts' estimates for earnings per
							share 4 weeks ago is calculated with the current expectations for
							the current year and the coming year.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							Surprisingly positive or negative analysts' expectations are
							reflected in the performance of the value on the trading day.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the profit revision is greater than 5%.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the profit revision is between -5% and +5%.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the profit revision is less than -5%.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>None</p>
					</div>
					<div className="modal-body-data">
						<h4>DATA FOR {props.data.data.sec_name}</h4>
						<p>
							Current fiscal year 2021 EPS 2021 am 30.04.2021: 9.61 USD EPS 2021
							am 02.04.2021: 9.51 USD EPS 2022 am 30.04.2021: 10.46 USD EPS 2022
							am 02.04.2021: 10.28 USD-- TO BE CHANGED
						</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table"></p>
						<p className="modal-table">
							Profit revision 2021 = <span></span>
						</p>
						<p className="modal-table">
							Profit revision 2022 = <span></span>
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
export default connect(mapStateToProps)(RowEight);
