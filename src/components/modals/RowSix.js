import React from "react";
import { connect } from "react-redux";

function RowSix(props) {
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
					<h1>ANALYST OPINIONS</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							Equities are ranked by the analysts in a three-level scale: buy =
							1, hold = 2, sell = 3. An average of analyst opinions is
							calculated.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							The opinions of the analysts reflect a majority opinion, which are
							no longer surprises and thus bring no great upside potential. In
							the case of large and medium-sized companies, this indicator is
							used as a contraindicator. For smaller companies with a low number
							of analyst opinions this does not apply. For the classification of
							companies in smallcap, midcap and largecap see key figure 14.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the factor is equal to or greater than 2,5.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the factor is between 1,5 and 2,5.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the factor is less than or equal to 1,5.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>
							If the stock is a smallcap and there are no more than 5 analyst
							opinions, the valuation will be carried out with different omens.
							A metric equal to 1.5 is rated +1. An indicator equal to or
							greater than 2.5 is rated -1. A ratio between 1.5 and 2.5 is rated
							0 points.
						</p>
					</div>
					<div className="modal-body-data">
						<h4>DATA FOR {props.data.data.sec_name}</h4>
						<p className="modal-table">
							Buy <span>12 (Buy + Outperform)</span>
						</p>
						<p className="modal-table">
							Hold <span>6 (Hold)</span>
						</p>
						<p className="modal-table">
							Sell 0 <span>(Sell + Underperform)</span>
						</p>
					</div>
					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table"></p>
						<p className="modal-table">
							Value
							<span>{props.data.data.analyst_opinions_value}</span>
						</p>
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.analyst_opinions_score}
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
export default connect(mapStateToProps)(RowSix);
