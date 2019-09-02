import React from "react";
import PropTypes from "prop-types";

const AffichageSingleRow = ({ label, value, info }) => {
  var classname = info ? "row mt-5" : "row";
  return (
    <div>
      <div className={classname}>
        <div className="shadow col-5">
          <strong>{label}</strong>
        </div>
        <div className="shadow col-6 offset-1">
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
AffichageSingleRow.propTypes = {
  label: PropTypes.string.isRequired
};
export default AffichageSingleRow;
