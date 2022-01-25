import "./style/LogoProxy.css";
import React, { useState, useEffect } from "react";

class Logo {
  constructor() {
    const width = "600px";
    const height = "600px";
    const context = "logo.png";

    this.load = function () {
      return (
        <img
          style={{
            backgroundColor: "#FFFFFF",
            width: width,
            height: height,
            margin: "auto",
          }}
          src={context}
        />
      );
    };
  }
}

function LogoProxy({ load }) {
  let [logo, setLogo] = useState(null);

  const width = "600px";
  const height = "600px";

  setTimeout(() => {
    setLogo(new Logo().load);
  }, 1500);

  return (
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
  );
}

function HomePage() {
  function load() {}

  return (
    <div className="LogoProxy">
      <h2>E-faktura</h2>
      <LogoProxy load={load} />
      <h2>System zarządzania dokumentami w Twojej firmie.</h2>
    </div>
  );
}

export default HomePage;
