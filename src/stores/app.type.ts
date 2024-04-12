/**
 * Type representing the configuration options for an application.
 * @typedef {object} AppConfig
 * @property {string} title The title of the application.
 * @property {boolean} [resizable=true] Whether the application window is resizable.
 * @property {boolean} [isResizing=false] Whether the application window is resizing
 * @property {boolean} [expandable=false] Whether the application window is expandable.
 * @property {boolean} [isExpanding=false] Whether the application window is expanding
 * @property {boolean} [draggingEnabled=true] Whether the application window is allowed to be moved
 * @property {boolean} [isDragging=false] Whether the application window is actively moving
 * @property {isMaximized} [isMaximized=false] Whether the application window is maximized
 * @property {boolean} [isVisible=false] Whether the application window is currently Visible
 * @property {string|number} [top='10'] The top position of the window
 * @property {string|number} [left='10'] The left position of the window
 * @property {string|number} [height='500'] The height of the application window.
 * @property {string|number} [width='600'] The width of the application window.
 * @property {boolean} [shouldOpenWindow=true] Whether the application window should open by default.
 * @property {(e: unknown) => void} [externalAction] The action to perform when the dock button is clicked.
 * @property {boolean} [dockBreaksBefore=false] Whether there should be a break in the dock before this app.
 */
export type AppConfig = {
  title: string;
  resizable?: boolean;
  isResizing?: boolean;
  expandable?: boolean;
  isExpanding?: boolean;
  draggingEnabled?: boolean;
  isDragging?: boolean;
  isMaximized?: boolean;
  isVisible?: boolean;
  top?: string | number;
  left?: string | number;
  height?: string | number;
  width?: string | number;
  shouldOpenWindow?: boolean;
  externalAction?: (e: unknown) => void;
  dockBreaksBefore?: boolean;
};
