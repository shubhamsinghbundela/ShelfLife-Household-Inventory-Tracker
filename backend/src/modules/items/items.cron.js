import cron from "node-cron";
import { updateItemStatuses } from "./items.service.js";

cron.schedule("0 6 * * *", async () => {
  console.log("cronJob started...");
  await updateItemStatuses();
  console.log("cronJob ended...");
});
