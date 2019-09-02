import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const TextInputGroupAjoutProjet = ({
  label,
  value,
  onChange,
  name,
  type,
  error
}) => {
  return (
    <div className="row mt-2">
      <div className="col-3">
        <strong>{label}</strong>
      </div>
      <div className="col-7">
        <input
          type={type}
          name={name}
          className={classnames("form-control form-control-md", {
            "is-invalid": error
          })}
          value={value}
          onChange={onChange}
        />
        {type && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextInputGroupAjoutProjet.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};
export default TextInputGroupAjoutProjet;
