import { EmailNotifier } from "./notifiers/EmailNotifier";
import { PushNotifier } from "./notifiers/PushNotifier";
import { SmsNotifier } from "./notifiers/SMSNotifier";
import { NotificationService } from "./services/notificationService";

async function run() {
  const service = new NotificationService(
    [
      new EmailNotifier("noreply@example.com", {
        prefix: "[prod]",
        ratePerMinute: 20,
      }),
      new SmsNotifier("Twilio", { prefix: "[prod]", ratePerMinute: 10 }),
      new PushNotifier({ prefix: "[prod]" }),
    ],
    (msg) => console.log("[LOG]", msg)
  );

  await service.notifyAll("Hello OOP World!", "user@example.com");
}

run();
