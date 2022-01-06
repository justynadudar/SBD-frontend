import React from "react";
import PropTypes from "prop-types";

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
