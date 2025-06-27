import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/Auth0Context";

const LoginScreen: React.FC = () => {
  const { loginWithRedirect, isLoading, error, isAuthenticated } = useAuth0();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Automatically redirect to Auth0 when component mounts and user is not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("Auto-redirecting to Auth0 login...");
      const timer = setTimeout(() => {
        loginWithRedirect();
      }, 1500); // Small delay to show the loading screen briefly

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isAuthenticated) {
    return null; // Will be handled by the main app
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(135deg,rgb(46, 46, 47) 0%,rgb(0, 0, 0) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(0, 122, 255, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "10%",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(255, 59, 48, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: "150px",
            height: "150px",
            background:
              "radial-gradient(circle, rgba(255, 149, 0, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 7s ease-in-out infinite",
          }}
        />
      </div>

      {/* Main Login Card */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(30px)",
          borderRadius: "24px",
          padding: "60px 50px",
          textAlign: "center",
          boxShadow:
            "0 32px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)",
          minWidth: "400px",
          position: "relative",
          zIndex: 1,
          animation: "slideUp 0.8s ease-out",
        }}
      >
        {/* Animated Fugir Logo */}
        <div
          style={{
            width: "120px",
            height: "120px",
            background:
              "linear-gradient(135deg, #007aff 0%, #5856d6 50%, #af52de 100%)",
            borderRadius: "30px",
            margin: "0 auto 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            color: "white",
            boxShadow: "0 20px 40px rgba(0, 122, 255, 0.3)",
            animation: "logoGlow 3s ease-in-out infinite",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer effect */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
              animation: "shimmer 2s ease-in-out infinite",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>🚀</span>
        </div>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #1d1d1f 0%, #007aff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "0 0 8px 0",
            letterSpacing: "-1px",
            animation: "textGlow 2s ease-in-out infinite alternate",
          }}
        >
          Welcome to Fugir
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#8e8e93",
            margin: "0 0 40px 0",
            fontWeight: "400",
          }}
        >
          Your digital workspace awaits
        </p>

        {/* Enhanced Loading indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {/* Multi-dot loading animation */}
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #007aff 0%, #5856d6 100%)",
                    animation: `bounce 1.4s ease-in-out infinite both`,
                    animationDelay: `${i * 0.16}s`,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                color: "#007aff",
                fontSize: "16px",
                fontWeight: "600",
                animation: "fadeInOut 2s ease-in-out infinite",
              }}
            >
              {isLoading
                ? "Redirecting to secure login..."
                : "Initializing secure connection..."}
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: "200px",
              height: "3px",
              background: "rgba(0, 122, 255, 0.2)",
              borderRadius: "2px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "100%",
                background: "linear-gradient(90deg, #007aff, #5856d6)",
                borderRadius: "2px",
                animation: "progress 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Error Message */}
        {showError && error && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px 16px",
              background: "rgba(255, 59, 48, 0.1)",
              border: "1px solid rgba(255, 59, 48, 0.2)",
              borderRadius: "8px",
              color: "#d70015",
              fontSize: "14px",
              animation: "slideIn 0.3s ease",
            }}
          >
            {error}
          </div>
        )}

        {/* Footer */}
        <p
          style={{
            fontSize: "12px",
            color: "#8e8e93",
            margin: "30px 0 0 0",
            lineHeight: "1.4",
          }}
        ></p>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes logoGlow {
          0%, 100% { 
            box-shadow: 0 20px 40px rgba(0, 122, 255, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 25px 50px rgba(0, 122, 255, 0.5);
            transform: scale(1.02);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        @keyframes textGlow {
          0% { 
            text-shadow: 0 0 10px rgba(0, 122, 255, 0.3);
          }
          100% { 
            text-shadow: 0 0 20px rgba(0, 122, 255, 0.6);
          }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0.8) translateY(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1.1) translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;
