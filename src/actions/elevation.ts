/**
 * Sets the z-index property of the specified HTML element based on the predefined z-index configuration.
 * @param node The HTML element to apply the z-index to.
 * @param uiElement The key of the predefined z-index value from the zIndexConfig object.
 */
export function elevation(node: HTMLElement, uiElement: keyof typeof zIndexConfig) {
  // Set the z-index property of the HTML element using CSS custom properties
  node.style.zIndex = `var(--system-z-index-${uiElement})`;
}

// Predefined z-index configuration object
const zIndexConfig = {
  wallpaper: -1,
  'bootup-screen': 110,
  'context-menu': 100,
  'window-traffic-lights': 10,
  dock: 80,
  'dock-tooltip': 70,
  'system-updates-available': 60,
  'system-dialog': 90,
  'menubar-menu-parent': 160,
};

// Apply z-index values to CSS custom properties
for (const [element, zIndexValue] of Object.entries(zIndexConfig)) {
  document.body.style.setProperty(`--system-z-index-${element}`, zIndexValue + '');
}
