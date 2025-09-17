import type { INotifier } from "@/patterns/types/INotifier";

export class NotificationService {
  private notifiers: INotifier[];
  private logger?: (msg: string) => void;
  constructor(notifiers: INotifier[], logger?: (msg: string) => void) {
    this.notifiers = notifiers;
    this.logger = logger;
  }

  async notifyAll(message: string, recipient: string): Promise<void> {
    this.logger?.(`Sending notification to ${recipient}`);
    for (const notifier of this.notifiers) {
      await notifier.send(message, recipient);
    }
  }
}
