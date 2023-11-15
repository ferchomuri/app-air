import React from "react";
import "./Text.css";

export type ITextProps = {
  text: string;
  color?: string;
  weight?: number;
  size?: string;
  minSpace?: boolean;
};

const Text: React.FC<ITextProps> = ({
  text,
  color = "#000000",
  weight = 400,
  size = 16,
  minSpace,
}) => {
  const style = {
    "--text-color": color,
    "--text-weight": weight,
    "--text-size": size,
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
