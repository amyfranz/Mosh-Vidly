import React from "react";

const SelectBox = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        id={name}
        name={name}
        {...rest}
      >
        {options.map((optionInfo) => (
          <option value={optionInfo._id} key={optionInfo._id}>
            {optionInfo.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectBox;
