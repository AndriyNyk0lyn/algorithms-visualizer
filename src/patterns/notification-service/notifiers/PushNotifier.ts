import { BaseNotifier, type BaseNotifierOpts } from "./BaseNotifier";

export class PushNotifier extends BaseNotifier {
  constructor(opts?: BaseNotifierOpts) {
    super(opts);
  }

  protected async doSend(message: string, recipient: string): Promise<void> {
    console.log(`Push notification to ${recipient}: ${message}`);
    await new Promise((res) => setTimeout(res, 100)); // mock/simulate I/O, just for demo
  }
}
