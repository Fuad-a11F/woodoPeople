// ../client/vite.config.ts
import { defineConfig } from "file:///Users/margarita/Projects/woodoPeople/node_modules/vite/dist/node/index.js";
import react from "file:///Users/margarita/Projects/woodoPeople/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///Users/margarita/Projects/woodoPeople/node_modules/dotenv/lib/main.js";
dotenv.config();
var vite_config_default = defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3e3
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL)
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hcmdhcml0YS9Qcm9qZWN0cy93b29kb1Blb3BsZS9wYWNrYWdlcy9jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXJnYXJpdGEvUHJvamVjdHMvd29vZG9QZW9wbGUvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXJnYXJpdGEvUHJvamVjdHMvd29vZG9QZW9wbGUvcGFja2FnZXMvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52J1xuZG90ZW52LmNvbmZpZygpXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuQ0xJRU5UX1BPUlQpIHx8IDMwMDAsXG4gIH0sXG4gIGRlZmluZToge1xuICAgIF9fU0VSVkVSX1BPUlRfXzogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQsXG4gICAgX19FWFRFUk5BTF9TRVJWRVJfVVJMX186IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52LkVYVEVSTkFMX1NFUlZFUl9VUkwpLFxuICAgIF9fSU5URVJOQUxfU0VSVkVSX1VSTF9fOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5JTlRFUk5BTF9TRVJWRVJfVVJMKSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLE9BQU87QUFHZCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixpQkFBaUIsUUFBUSxJQUFJO0FBQUEsSUFDN0IseUJBQXlCLEtBQUssVUFBVSxRQUFRLElBQUksbUJBQW1CO0FBQUEsSUFDdkUseUJBQXlCLEtBQUssVUFBVSxRQUFRLElBQUksbUJBQW1CO0FBQUEsRUFDekU7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFDbkIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
