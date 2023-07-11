import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    global:"globalThis",
    "process.env": {},
  },
  build:{
    rollupOptions:{
      external:["@safe-globalThis/safe-core-sdk","@safe-globalThis/safe-ethers-adapters","@safe-globalThis/safe-ethers-lib"],
    }
  }
});
