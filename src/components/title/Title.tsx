import React from "react";
import "./Title.css";

export type ITitleProps = {
  text: string;
  level: number;
  color?: string;
  margin?: string;
};

const Title: React.FC<ITitleProps> = ({
  text,
  level,
  color = "#000000",
  margin,
}) => {
  const headerSize: Record<number, keyof JSX.IntrinsicElements> = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
  };

  const HeaderTag = headerSize[level] || "h4";

  const titleStyle: React.CSSProperties = {
    color: `var(--title-color, ${color})`,
    margin: margin,
  };

  return (
    <div className='title' style={titleStyle}>
      <HeaderTag>{text}</HeaderTag>
    </div>
  );
};

export { Title };
