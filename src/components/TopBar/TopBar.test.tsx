import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TopBar from "./TopBar";

// Mock the stores
vi.mock("@/stores/useAppsStore", () => ({
  useAppsStore: vi.fn(() => ({
    activeApp: "finder",
  })),
}));

vi.mock("@/stores/useAppStore", () => ({
  useAppStore: vi.fn(() => ({
    getApp: vi.fn(() => ({ title: "Finder" })),
  })),
}));

// Mock Auth0 context
vi.mock("../../contexts/Auth0Context", () => ({
  useAuth0: vi.fn(() => ({
    user: { name: "Test User", email: "test@example.com" },
    logout: vi.fn(),
  })),
}));

// Mock menu config
vi.mock("@/configs/menu/topbar.menu.config", () => ({
  getMenuConfigForApp: vi.fn(() => ({
    File: [
      { title: "New", action: "file:new" },
      { title: "Open", action: "file:open" },
    ],
    Edit: [
      { title: "Copy", action: "edit:copy" },
      { title: "Paste", action: "edit:paste" },
    ],
  })),
}));

describe("TopBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the rocket emoji logo", () => {
    render(<TopBar />);
    expect(screen.getByText("🚀")).toBeInTheDocument();
  });

  it("displays the current app name", () => {
    render(<TopBar />);
    expect(screen.getByText("Finder")).toBeInTheDocument();
  });

  it("shows the current time", () => {
    render(<TopBar />);
    // Time format includes day of week, so we check for a pattern
    const timeElement = screen.getByText(/\d{1,2}:\d{2}/);
    expect(timeElement).toBeInTheDocument();
  });

  it("displays menu items for the current app", () => {
    render(<TopBar />);
    expect(screen.getByText("File")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("shows system control icons", () => {
    render(<TopBar />);
    // Check for emoji-based system controls
    expect(screen.getByText("🔍")).toBeInTheDocument(); // Search
    expect(screen.getByText("🎛️")).toBeInTheDocument(); // Control Center
    expect(screen.getByText("🔋")).toBeInTheDocument(); // Battery
    expect(screen.getByText("📶")).toBeInTheDocument(); // WiFi
    expect(screen.getByText("🔊")).toBeInTheDocument(); // Sound
  });

  it("displays user avatar with first letter of name", () => {
    render(<TopBar />);
    expect(screen.getByText("T")).toBeInTheDocument(); // First letter of "Test User"
  });

  it("renders with proper structure", () => {
    render(<TopBar />);

    // Just verify the TopBar renders with expected elements
    expect(screen.getByText("🚀")).toBeInTheDocument();
    expect(screen.getByText("Finder")).toBeInTheDocument();
    expect(screen.getByText("File")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
