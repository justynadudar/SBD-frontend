import "./style/LogoProxy.css";
import React, { useState, useEffect } from "react";

class Logo {
  constructor() {
    const width = "600px";
    const height = "600px";

    this.load = function () {
      return (
        <img
          style={{
            backgroundColor: "#FFFFFF",
            width: width,
            height: height,
            margin: "auto",
          }}
          src={"logo.png"}
        />
      );
    };
  }
}

function LogoProxy() {
  let [logo, setLogo] = useState(null);

  const width = "600px";
  const height = "600px";
  setTimeout(() => {
    setLogo(new Logo().load());
  }, 1500);
  return (
    <div className="LogoProxy">
      <h2>E-faktura</h2>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: width,
          height: height,
          margin: "auto",
        }}
      >
        {logo === null ? null : logo}
      </div>
      <h2>System zarządzania dokumentami w Twojej firmie.</h2>
    </div>
  );
}

export default LogoProxy;
