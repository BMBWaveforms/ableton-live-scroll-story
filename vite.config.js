import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/ableton-live-scroll-story/" : "/",
}));
