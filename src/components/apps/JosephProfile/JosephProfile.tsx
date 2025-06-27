import React from "react";

const JosephProfile: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        fontFamily: "SF Pro Display, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        👨‍💻 About the Developer
      </h1>
      <p>Developer profile coming soon...</p>
    </div>
  );
};

export default JosephProfile;
