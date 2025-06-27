import React, { useState } from "react";

const Safari: React.FC = () => {
  const [url, setUrl] = useState("https://www.apple.com");

  return (
    <div
      style={{
        height: "100%",
        background: "#f6f6f6",
        display: "flex",
        flexDirection: "column",
        fontFamily: "SF Pro Display, -apple-system, sans-serif",
      }}
    >
      {/* Navigation Bar */}
      <div
        style={{
          background: "linear-gradient(180deg, #fafafa 0%, #e8e8e8 100%)",
          borderBottom: "1px solid #d0d0d0",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "linear-gradient(180deg, #fff 0%, #f0f0f0 100%)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            ←
          </button>
          <button
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "linear-gradient(180deg, #fff 0%, #f0f0f0 100%)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            →
          </button>
        </div>

        {/* URL Bar */}
        <div
          style={{
            flex: 1,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "6px 16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#666", marginRight: "8px", fontSize: "14px" }}>
            🔒
          </span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "14px",
              background: "transparent",
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "linear-gradient(180deg, #fff 0%, #f0f0f0 100%)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            📚
          </button>
          <button
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "linear-gradient(180deg, #fff 0%, #f0f0f0 100%)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            padding: "40px",
            background: "#f8f9fa",
            borderRadius: "12px",
            border: "1px solid #e9ecef",
          }}
        >
          <h2
            style={{
              margin: "0 0 16px 0",
              color: "#333",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            Welcome to Safari
          </h2>
          <p
            style={{
              margin: "0 0 24px 0",
              color: "#666",
              fontSize: "16px",
              lineHeight: "1.5",
            }}
          >
            This is a simulated Safari browser. Web browsing functionality will
            be added in future updates.
          </p>
          <div
            style={{
              padding: "16px",
              background: "#e3f2fd",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#1976d2",
            }}
          >
            🌐 Current URL: {url}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safari;
