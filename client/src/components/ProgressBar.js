import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-bar">
      <div className="filler" style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
};

ProgressBar.defaultProps = {
  percentage: 0,
};

export default ProgressBar;
