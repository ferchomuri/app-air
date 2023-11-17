import React from "react";
import "./Text.css";

export type ITextProps = {
  text: string;
  color?: string;
  weight?: number;
  size?: string;
  minSpace?: boolean;
  center?: boolean;
  margin?: string;
};

const Text: React.FC<ITextProps> = ({
  text,
  color = "#000000",
  weight = 400,
  size = 16,
  minSpace,
  center,
  margin,
}) => {
  const style = {
    "--text-color": color,
    "--text-weight": weight,
    "--text-size": size,
    "--text-align": center ? "center" : "left",
    "--text-margin": margin,
  } as React.CSSProperties;

  return (
    <div>
      <p className={`text ${minSpace ? "min-space" : ""}`} style={style}>
        {text}
      </p>
    </div>
  );
};

export { Text };
