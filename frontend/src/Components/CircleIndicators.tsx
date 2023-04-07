import React from "react";
import "./CircleIndicators.css";

type CircleIndicatorsProps = {
  activeIndex: number;
  length?: number;
};

const CircleIndicators = ({
  activeIndex = 0,
  length = 2,
}: CircleIndicatorsProps) => {
  return (
    <div className="circleIndicators">
      {Array.from({ length }, (_, i) => (
        <div
          key={i}
          className={`circleIndicator ${i === activeIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default CircleIndicators;
