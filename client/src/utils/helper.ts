import { IConfig } from "./types";

export const applyThemeColors = (uiConfig: IConfig) => {
  const root = document.documentElement;

  const { colors, typography } = uiConfig;

  const setProperty = (key: string, value: string) => {
    root.style.setProperty(key, value);
  };

  // Background Colors
  setProperty("--color-bg-primary", colors.bgColor.primary);
  setProperty(
    "--color-bg-secondary",
    colors.bgColor.secondary
  );
  setProperty("--color-bg-surface", colors.bgColor.surface);

  // Text Colors
  setProperty(
    "--color-text-primary",
    colors.textColor.primary
  );
  setProperty(
    "--color-text-secondary",
    colors.textColor.secondary
  );
  setProperty("--color-text-link", colors.textColor.link);
  setProperty(
    "--color-text-inverse",
    colors.textColor.inverse
  );

  // Accent & Border
  setProperty("--color-accent", colors.accentColor);
  setProperty("--color-border", colors.borderColor);

  // State Colors
  setProperty("--color-success", colors.states.success);
  setProperty("--color-warning", colors.states.warning);
  setProperty("--color-error", colors.states.error);
  setProperty("--color-info", colors.states.info);

  // Typography
  setProperty("--font-family-base", typography.fontFamily);
  // setProperty("--font-size-base", typography.fontSizeBase);
};
