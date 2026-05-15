import type { Config } from "vike/types";
import vikeVue from "vike-vue/config";

const config: Config = {
  title: "Bellegems Friethuisje",
  description: "Meer dan een frituur alleen – Bellegems Friethuisje",
  extends: [vikeVue],
  prerender: false,
  stream: false,
  server: true,
};

export default config;
