import { ViteDevServer } from "vite";

export let devPlugin = () => {
  return {
    name: "dev-plugin",
    configureServer(server: ViteDevServer) {
      require("esbuild").buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });
      server.httpServer!.once("listening", () => {
        let { spawn } = require("child_process");
        let addressInfo = server.httpServer!.address();
        if (!addressInfo) {
          return
        }
        let httpAddress = typeof addressInfo === "string" ? addressInfo : `http://${addressInfo.address}:${addressInfo.port}`;
        let electronProcess = spawn(
          require("electron").toString(),
          ["./dist/mainEntry.js", httpAddress],
          {
            cwd: process.cwd(),
            stdio: "inherit",
          }
        );
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};
