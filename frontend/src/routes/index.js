import { lazy } from "react";

export const routes = [
  {
    path: "",
    component: lazy(() => import("@/components/joinHouseHold/JoinHouseHold")),

    isProtected: false,
  },

  {
    path: "/items",

    component: lazy(() => import("@/components/dashboard/items/Items")),

    isProtected: true,
  },
  {
    path: "/members",
    component: lazy(() => import("@/components/dashboard/members/Members")),
    isProtected: true,
  },
];
