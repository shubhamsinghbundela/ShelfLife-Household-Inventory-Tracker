import { lazy } from "react";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("@/components/auth/Login")),
  },

  {
    path: "/signup",
    component: lazy(() => import("@/components/auth/Signup")),
  },

  {
    path: "/dashboard",
    component: lazy(() => import("@/components/dashboard/Dashboard")),
  },
];
