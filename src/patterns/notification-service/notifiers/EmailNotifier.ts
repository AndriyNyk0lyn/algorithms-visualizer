import { BaseNotifier, type BaseNotifierOpts } from "./BaseNotifier";

export class EmailNotifier extends BaseNotifier {
  private sender: string;
  constructor(sender: string, opts?: BaseNotifierOpts) {
    super(opts);
    this.sender = sender;
  }

  protected async doSend(message: string, recipient: string): Promise<void> {
    console.log(`Email from ${this.sender} to ${recipient}: ${message}`);
    await new Promise((res) => setTimeout(res, 100));
  }
}
