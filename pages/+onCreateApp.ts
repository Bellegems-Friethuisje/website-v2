import type { OnCreateAppSync } from "vike-vue/types";

type GtagWindow = Window & {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
};

export const onCreateApp: OnCreateAppSync = (_pageContext): ReturnType<OnCreateAppSync> => {
  if (import.meta.env.SSR) return;

  const gaId = import.meta.env.PUBLIC_ENV__GOOGLE_ANALYTICS as string | undefined;
  if (!gaId || gaId.includes("XXXX")) return;

  const w = window as unknown as GtagWindow;
  w.dataLayer = w.dataLayer || [];

  // Only define the stub if gtag.js hasn't already loaded and defined it
  if (!w.gtag) {
    w.gtag = function () {
      w.dataLayer.push(arguments as unknown);
    };
  }

  w.gtag("js", new Date());
  w.gtag("config", gaId);
};
