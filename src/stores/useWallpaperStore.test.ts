import { describe, it, expect, beforeEach } from "vitest";
import { useWallpaperStore } from "./useWallpaperStore";

describe("useWallpaperStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useWallpaperStore.setState({
      currentWallpaper: "favorite-46",
      isDynamic: true,
    });
  });

  it("has correct initial state", () => {
    const state = useWallpaperStore.getState();
    expect(state.currentWallpaper).toBe("favorite-46");
    expect(state.isDynamic).toBe(true);
    expect(state.availableWallpapers).toBeDefined();
    expect(state.availableWallpapers.length).toBeGreaterThan(0);
  });

  it("includes Defiance wallpaper in available wallpapers", () => {
    const state = useWallpaperStore.getState();
    const defianceWallpaper = state.availableWallpapers.find(
      (w) => w.id === "favorite-46",
    );

    expect(defianceWallpaper).toBeDefined();
    expect(defianceWallpaper?.name).toBe("Defiance");
    expect(defianceWallpaper?.url).toBe("46.jpg");
    expect(defianceWallpaper?.category).toBe("artistic");
  });

  it("can set a new wallpaper", () => {
    const { setWallpaper } = useWallpaperStore.getState();

    setWallpaper("big-sur");

    const newState = useWallpaperStore.getState();
    expect(newState.currentWallpaper).toBe("big-sur");
  });

  it("can toggle dynamic mode", () => {
    const { setDynamic } = useWallpaperStore.getState();

    setDynamic(false);

    let newState = useWallpaperStore.getState();
    expect(newState.isDynamic).toBe(false);

    setDynamic(true);

    newState = useWallpaperStore.getState();
    expect(newState.isDynamic).toBe(true);
  });

  it("getCurrentWallpaperUrl returns correct URL for current wallpaper", () => {
    const { getCurrentWallpaperUrl, setWallpaper } =
      useWallpaperStore.getState();

    setWallpaper("favorite-46");
    const url = getCurrentWallpaperUrl();

    expect(url).toBe("/46.jpg");
  });

  it("getCurrentWallpaperUrl returns fallback for unknown wallpaper", () => {
    // Manually set an invalid wallpaper
    useWallpaperStore.setState({
      currentWallpaper: "invalid-wallpaper" as any,
    });

    const { getCurrentWallpaperUrl } = useWallpaperStore.getState();
    const url = getCurrentWallpaperUrl();

    expect(url).toBe("/big-sur-1.jpg");
  });

  it("has wallpapers organized by categories", () => {
    const state = useWallpaperStore.getState();

    const macosWallpapers = state.availableWallpapers.filter(
      (w) => w.category === "macos",
    );
    const artisticWallpapers = state.availableWallpapers.filter(
      (w) => w.category === "artistic",
    );
    const natureWallpapers = state.availableWallpapers.filter(
      (w) => w.category === "nature",
    );

    expect(macosWallpapers.length).toBeGreaterThan(0);
    expect(artisticWallpapers.length).toBeGreaterThan(0);
    expect(natureWallpapers.length).toBeGreaterThan(0);
  });

  it("includes all expected artistic wallpapers", () => {
    const state = useWallpaperStore.getState();
    const artisticWallpapers = state.availableWallpapers.filter(
      (w) => w.category === "artistic",
    );

    const expectedArtisticWallpapers = [
      "favorite-46",
      "kryptonian-demise",
      "nahargarh-sunset",
      "somber-forest",
      "blade-runner-2149",
      "dune",
      "tron",
    ];

    expectedArtisticWallpapers.forEach((expectedId) => {
      const wallpaper = artisticWallpapers.find((w) => w.id === expectedId);
      expect(wallpaper).toBeDefined();
    });
  });
});
