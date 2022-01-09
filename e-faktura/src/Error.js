import React from "react";

const Error = ({ error, info }) => {
  return (
    <div>
      {error ? (
        <div className="Error">
          <p style={{ color: "red" }}>{info}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Error;
