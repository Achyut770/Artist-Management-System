import React from "react";
import { FaSpinner } from "react-icons/fa6";
import "./styles/Button.css";

const Button = ({ className, children, isloading, disabled, ...res }) => {
  return (
    <button
      className={`custom-button ${className}`}
      {...res}
      disabled={isloading || disabled}
    >
      {!isloading ? children : <FaSpinner className="spin" />}
    </button>
  );
};

export default Button;
