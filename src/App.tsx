import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "./contexts/Auth0Context";
import DesktopPage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginScreen from "./components/Auth/LoginScreen";
import LoadingScreen from "./components/Auth/LoadingScreen";
import ErrorBoundary from "./components/ErrorBoundary";

const AuthenticatedApp: React.FC = () => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();

  console.log("Auth state:", { isLoading, isAuthenticated, error, user });

  if (isLoading) {
    console.log("Showing loading screen");
    return <LoadingScreen />;
  }

  // Only show login screen for errors if user is not authenticated
  if (error && !isAuthenticated) {
    console.error("Auth error:", error);
    return <LoginScreen />;
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, showing login");
    return <LoginScreen />;
  }

  console.log("Authenticated, showing desktop");
  return (
    <Routes>
      <Route path="/" element={<DesktopPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Auth0Provider>
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </Auth0Provider>
    </ErrorBoundary>
  );
};

export default App;
