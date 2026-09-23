import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("system", "routes/system.tsx"),
] satisfies RouteConfig;
