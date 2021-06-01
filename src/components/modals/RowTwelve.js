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
					<h1>THREE-MONTH-REVERSAL</h1>
					<div className="modal-body-definition">
						<h4>DEFINITION</h4>
						<p>
							This factor takes into account the evolution of the value in the
							last 3 months in relation to the benchmark index.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>IMPORTANCE</h4>
						<p>
							Many funds sort out stocks that have performed poorly over the
							last 3 months or buy stocks that have outperformed. These
							purchases and sales initially affect the price and later correct
							themselves.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>SCORE</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the performance in each month is worse than
							the benchmark.
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the performance in each month is better than
							the benchmark index.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>in all other cases.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>EXCEPTION</h4>
						<p>The calculation applies only to large caps.</p>
					</div>
					<div className="modal-body-data">
						<h4>DATA FOR {props.data.data.sec_name}</h4>
						<p>
							Close 31.12.2020: 157.380 USD Close 29.01.2021: 163.130 USD Close
							26.02.2021: 158.460 USD Close 31.03.2021: 164.350 USD Dow Jones
							Close 31.12.2020: 30606.48 USD Dow Jones Close 29.01.2021:
							29982.62 USD Dow Jones Close 26.02.2021: 30932.37 USD Dow Jones
							Close 31.03.2021: 32981.55 USD --TO BE CHANGED
						</p>
					</div>

					<div className="modal-body-calculation">
						<h4>CALCULATION FOR {props.data.data.sec_name}</h4>
						<p className="modal-table">
							Performance January:<span></span>
						</p>
						<p className="modal-table">
							Performance March:<span></span>
						</p>
						<p className="modal-table">
							Performance March:<span></span>
						</p>
						<br />
						<p className="modal-table">
							Dow Jones-Performance January:<span></span>
						</p>
						<p className="modal-table">
							Dow Jones-Performance March:<span></span>
						</p>
						<p className="modal-table">
							Dow Jones-Performance March:<span></span>
						</p>
						<br />
						<p className="modal-table">Jan: Performance &gt; Dow Jones-Perf </p>
						<p className="modal-table">Mar: Performance &lt; Dow Jones-Perf.</p>
						<p className="modal-table">
							March: Performance &lt; Dow Jones-Perf{" "}
						</p>

						<br />
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.three_month_reversal_score}
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
export default connect(mapStateToProps)(RowEleven);
