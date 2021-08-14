import React from "react";

const Message = ({ error }) => {
  return (
    <div className="error-message">
      <p>{error}!</p>
    </div>
  );
};

export default Message;
