import React from "react";
import Close from "../../assets/close.png";
import "./Dialog.css";

export type IDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Dialog: React.FC<IDialogProps> = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    zIndex: 999,
  } as React.CSSProperties;

  const overlayStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 998,
  } as React.CSSProperties;

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <img className='close-img' src={Close} />
        <span
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "20px",
          }}
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </>
  );
};

export { Dialog };
