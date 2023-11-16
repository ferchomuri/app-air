import React from "react";
import "./Input.css";

export type IInputProps = {
  icon?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<IInputProps> = ({ icon, value, onChange }) => {
  return (
    <div className='container-input'>
      {icon ? (
        <div>
          <img className='icon' src={icon} />
          <input value={value} onChange={onChange} />
        </div>
      ) : (
        <input value={value} onChange={onChange} />
      )}
    </div>
  );
};

export { Input };
