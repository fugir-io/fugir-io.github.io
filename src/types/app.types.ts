/**
 * Type representing the configuration options for an application.
 */
export interface AppConfig {
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
}

/**
 * App properties mapping type
 */
export type AppProperties = Record<string, AppConfig>;

/**
 * Theme configuration
 */
export interface Theme {
  scheme: "light" | "dark";
  primaryColor: string;
}

/**
 * WebService connection status
 */
export type ConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

/**
 * WebService configuration
 */
export interface WebServiceConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  auth?: {
    type: "bearer" | "basic" | "api-key";
    token?: string;
    username?: string;
    password?: string;
    apiKey?: string;
    apiKeyHeader?: string;
  };
}

/**
 * WebService connection state
 */
export interface WebServiceConnection {
  appId: string;
  config: WebServiceConfig;
  status: ConnectionStatus;
  error?: string;
  lastConnected?: Date;
  retryCount?: number;
}
