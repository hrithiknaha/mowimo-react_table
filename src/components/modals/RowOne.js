import React from "react";
import { connect } from "react-redux";
import i18n from "../../i18n";

function RowOne(props) {
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
					<h1>{i18n.t("roe_value")}</h1>
					<div className="modal-body-definition">
						<h4>{i18n.t("DEFINITION")}</h4>
						<p>
							The return on equity (RoE) describes the relationship between
							profit and equity.
						</p>
					</div>
					<div className="modal-body-importance">
						<h4>{i18n.t("IMPORTANCE")}</h4>
						<p>
							The return on equity is important for equities. It has been found
							that there is a connection between the return on equity and the
							performance of the stock. The higher the return on equity, the
							more likely an increase in value.
						</p>
					</div>
					<div className="modal-body-score">
						<h4>{i18n.t("SCORE")}</h4>
						<p className="modal-table">
							<span>+1 Pkt</span> if the return on equity is greater than 20%
						</p>
						<p className="modal-table">
							<span>0 Pkt</span> if the return on equity is between 10% and 20%.
						</p>
						<p className="modal-table">
							<span>-1 Pkt</span>if the return on equity is less than 10%.
						</p>
					</div>
					<div className="modal-body-exception">
						<h4>{i18n.t("EXCEPTION")}</h4>
						<p>None.</p>
					</div>
					<div className="modal-body-calculation">
						<h4>
							{i18n.t("CALCULATION FOR")} {props.data.data.sec_name}
						</h4>
						<p className="modal-table">
							Last Year <span>2020</span>
						</p>
						<p className="modal-table">
							Return on Equity CY
							<span>{props.data.data.roe_value}</span>
						</p>
						<p className="modal-table">
							Point
							<span className={`flag-modal-${color}`}>
								{props.data.data.roe_score}
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
export default connect(mapStateToProps)(RowOne);
