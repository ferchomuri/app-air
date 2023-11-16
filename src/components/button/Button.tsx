import React from "react";
import "./Button.css";

export type IButtonProps = {
  text: string;
  onClick?: () => void;
};

const Button: React.FC<IButtonProps> = ({ text, onClick }) => {
  return (
    <div className='container-btn'>
      <button className='btn' onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export { Button };
