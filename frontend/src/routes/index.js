import { lazy } from "react";

export const routes = [
  {
    path: "",
    component: lazy(() => import("@/components/joinHouseHold/JoinHouseHold")),

    isProtected: false,
  },

  {
    path: "/items",

    component: lazy(() => import("@/components/dashboard/items")),

    isProtected: true,
  },
];
