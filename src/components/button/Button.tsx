import React from "react";
import "./Button.css";

export type IButtonProps = {
  text: string;
};

const Button: React.FC<IButtonProps> = ({ text }) => {
  return (
    <div className='container-btn'>
      <button className='btn'>{text}</button>
    </div>
  );
};

export { Button };
