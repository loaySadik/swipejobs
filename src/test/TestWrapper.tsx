import { render, RenderOptions } from "@testing-library/react-native";
import React, { ReactNode } from "react";
export * from "@testing-library/react-native";

// Extended render options that include any custom providers your app might need
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  wrapper?: React.ComponentType<{ children: ReactNode }>;
}

export function renderWithWrapper(
  ui: React.ReactElement,
  options?: CustomRenderOptions
) {
  // Wrap component with any providers your components need
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      // Add providers here as needed
      <>{children}</>
    );
  }

  // Return rendered component with useful test utilities
  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export function clearAllMocks() {
  jest.clearAllMocks();
}
