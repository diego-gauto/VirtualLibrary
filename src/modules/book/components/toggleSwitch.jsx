import React from "react";
import "../styles/toggleSwitch.css";

const ToggleSwitch = ({ label, check, setCheck }) => {
  const handleClick = () => {
    setCheck(!check);
  };

  return (
    <div className="switch-container">
      {label}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          onClick={handleClick}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
