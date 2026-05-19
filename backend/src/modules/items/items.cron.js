import cron from "node-cron";
import { updateItemStatuses } from "./items.service.js";
import houseHoldModel from "../households/households.model.js";
import { sendMail } from "../../common/config/email.js";

cron.schedule("0 6 * * *", async () => {
  try {
    console.log("cronJob started...");
    const expiringItems = await updateItemStatuses();
    console.log("expiringItems", expiringItems);
    if (!expiringItems.length) {
      console.log("No expiring items");
      return;
    }

    const grouped = {};
    for (const item of expiringItems) {
      const key = item.householdId.toString();
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    }

    for (const householdId of Object.keys(grouped)) {
      const household = await houseHoldModel
        .findById(householdId)
        .populate("members", "email");

      const emails = household.members.map((u) => u.email);

      const itemsList = grouped[householdId]
        .map(
          (i) =>
            `<li>${i.name} - expires on ${new Date(i.expiryDate).toDateString()}</li>`,
        )
        .join("");

      const html = `
        <h2>Expiring Items Alert</h2>
        <p>The following items will expire within 24 hours:</p>
        <ul>${itemsList}</ul>
      `;

      console.log("42");
      // 5. Send email to all members
      for (const email of emails) {
        await sendMail(email, "Items Expiring Soon", html);
      }
    }
  } catch (err) {
    console.error("Cron failed:", err);
  }
});
