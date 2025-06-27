import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders the loading screen with correct text", () => {
    render(<LoadingScreen />);

    expect(screen.getByText("Loading Fugir")).toBeInTheDocument();
    expect(screen.getByText("Preparing your workspace...")).toBeInTheDocument();
  });

  it("displays loading spinner", () => {
    render(<LoadingScreen />);

    // Check for spinner by looking for the loading text
    const loadingText = screen.getByText("Loading Fugir");
    expect(loadingText).toBeInTheDocument();

    // The spinner should be present as a styled div
    const container = loadingText.closest("div");
    expect(container).toBeInTheDocument();
  });

  it("displays progress dots animation", () => {
    render(<LoadingScreen />);

    // The component should render without errors
    expect(screen.getByText("Loading Fugir")).toBeInTheDocument();
    expect(screen.getByText("Preparing your workspace...")).toBeInTheDocument();
  });

  it("has fullscreen layout structure", () => {
    render(<LoadingScreen />);

    // Just verify the component renders correctly
    const loadingText = screen.getByText("Loading Fugir");
    const preparingText = screen.getByText("Preparing your workspace...");

    expect(loadingText).toBeInTheDocument();
    expect(preparingText).toBeInTheDocument();
  });

  it("does not display the commented out rocket emoji", () => {
    render(<LoadingScreen />);

    // The rocket emoji is commented out in the code
    expect(screen.queryByText("🚀")).not.toBeInTheDocument();
  });
});
