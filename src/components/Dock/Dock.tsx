import React, { useState } from "react";
import { useAppsStore, AppID } from "@/stores/useAppsStore";
import { appsConfig } from "@/configs/apps/appsConfig";

const Dock: React.FC = () => {
  const [hoveredApp, setHoveredApp] = useState<AppID | null>(null);
  const { openApp, openApps, setActiveApp, activeApp } = useAppsStore(
    (state) => ({
      openApp: state.openApp,
      openApps: state.openApps,
      setActiveApp: state.setActiveApp,
      activeApp: state.activeApp,
    }),
  );

  const appIds = Object.keys(appsConfig) as AppID[];

  const handleAppClick = (appId: AppID) => {
    if (openApps[appId]) {
      // App is already open, just bring it to focus
      console.log(`🔄 Focusing already open app: ${appId}`);
      setActiveApp(appId);
    } else {
      // App is not open, open it (which will automatically focus it)
      console.log(`🚀 Opening new app: ${appId}`);
      openApp(appId);
    }
  };

  const getAppIcon = (appId: AppID): string => {
    // Map app IDs to their icon paths
    const iconMap: Record<AppID, string> = {
      finder: "/app-icons/finder/256.png",
      calculator: "/app-icons/calculator/256.png",
      safari: "/app-icons/safari/256.png",
      terminal: "/app-icons/terminal/256.png",
      vscode: "/app-icons/vscode/256.png",
      calendar: "/app-icons/calendar/256.png",
      appstore: "/app-icons/appstore/256.png",
      wallpapers: "/app-icons/wallpapers/256.png",
      developer: "/app-icons/developer/256.webp",
    };
    return iconMap[appId] || "/app-icons/finder/256.png";
  };

  const getAppName = (appId: AppID): string => {
    return appsConfig[appId]?.title || appId;
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      {appIds.map((appId) => {
        const isOpen = openApps[appId];
        const isHovered = hoveredApp === appId;
        const isActive = activeApp === appId && isOpen;
        const scale = isHovered ? 1.3 : isActive ? 1.1 : 1;

        return (
          <div
            key={appId}
            style={{
              position: "relative",
              transition: "transform 0.2s ease",
              transform: `scale(${scale})`,
            }}
            onMouseEnter={() => setHoveredApp(appId)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            <button
              onClick={() => handleAppClick(appId)}
              style={{
                width: "48px",
                height: "48px",
                background: isActive ? "rgba(0, 122, 255, 0.2)" : "none",
                border: isActive ? "2px solid rgba(0, 122, 255, 0.3)" : "none",
                cursor: "pointer",
                borderRadius: "12px",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "all 0.2s ease",
                boxShadow: isActive
                  ? "0 0 12px rgba(0, 122, 255, 0.4)"
                  : "none",
              }}
              title={getAppName(appId)}
            >
              <img
                src={getAppIcon(appId)}
                alt={getAppName(appId)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                }}
                onError={(e) => {
                  // Fallback to a default icon if the image fails to load
                  (e.target as HTMLImageElement).src =
                    "/app-icons/finder/256.png";
                }}
              />

              {/* Running indicator */}
              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#333",
                    borderRadius: "50%",
                  }}
                />
              )}
            </button>

            {/* Tooltip */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  zIndex: 1001,
                }}
              >
                {getAppName(appId)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
