import React from "react";
import "./Input.css";

export type IInputProps = {
  icon?: string;
};

const Input: React.FC<IInputProps> = ({ icon }) => {
  return (
    <div className='container-input'>
      {icon ? (
        <div>
          <img className='icon' src={icon} />
          <input />
        </div>
      ) : (
        <input />
      )}
    </div>
  );
};

export { Input };
