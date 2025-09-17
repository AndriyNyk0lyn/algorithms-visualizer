import { BaseNotifier } from "./BaseNotifier";
import type { BaseNotifierOpts } from "./BaseNotifier";

export class SmsNotifier extends BaseNotifier {
  private providerName: string;
  constructor(providerName: string, opts?: BaseNotifierOpts) {
    super(opts);
    this.providerName = providerName;
  }

  protected async doSend(message: string, recipient: string): Promise<void> {
    console.log(`SMS via ${this.providerName} to ${recipient}: ${message}`);
    await new Promise((res) => setTimeout(res, 100)); // mock/simulate I/O, just for demo
  }
}
