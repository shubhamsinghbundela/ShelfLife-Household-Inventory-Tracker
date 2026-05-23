import { lazy } from "react";

export const routes = [
  {
    path: "",
    component: lazy(() => import("@/components/joinHouseHold/JoinHouseHold")),
  },
];
