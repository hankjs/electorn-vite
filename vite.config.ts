import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { devPlugin, getReplacer } from "./plugins/devPlugin";
import optimizer from "vite-plugin-optimizer";
import { buildPlugin } from "./plugins/buildPlugin";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      "process.env": "process.env",
      __APP_ENV__: env,
    },
    assetsInclude: [
      "**/*.db"
    ],
    plugins: [optimizer(getReplacer()), devPlugin(), vue()],
    build: {
      rollupOptions: {
        plugins: [buildPlugin()],
      },
    },
  }
});