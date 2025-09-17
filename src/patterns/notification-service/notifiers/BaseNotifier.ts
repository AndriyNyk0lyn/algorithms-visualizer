import type { INotifier } from "@/patterns/types/INotifier";

export type BaseNotifierOpts = {
  enabled?: boolean;
  prefix?: string;
  ratePerMinute?: number;
};

export abstract class BaseNotifier implements INotifier {
  private readonly enabled: boolean;
  private readonly prefix?: string;
  private readonly ratePerMinute: number;
  private readonly hits = new Map<string, number[]>();

  protected constructor(opts: BaseNotifierOpts = {}) {
    this.enabled = opts.enabled ?? true;
    this.prefix = opts.prefix;
    this.ratePerMinute = Math.max(0, opts.ratePerMinute ?? 0);
  }

  async send(rawMessage: string, recipient: string): Promise<void> {
    if (!this.enabled) return;

    const message = this.applyPrefix(this.validate(rawMessage));

    this.enforceRateLimit(recipient);
    await this.doSend(message, recipient);
  }

  protected validate(m: string): string {
    const msg = m?.trim();
    if (!msg) throw new Error("Message is empty");
    return msg;
  }

  protected applyPrefix(m: string): string {
    return this.prefix ? `${this.prefix} ${m}` : m;
  }

  private enforceRateLimit(recipient: string) {
    if (!this.ratePerMinute) return;
    const now = Date.now();
    const windowMs = 60_000;
    const limit = this.ratePerMinute;

    const arr = (this.hits.get(recipient) ?? []).filter(
      (t) => now - t < windowMs
    );
    if (arr.length >= limit) {
      throw new Error(`Rate limit exceeded for ${recipient} (${limit}/min)`);
    }
    arr.push(now);
    this.hits.set(recipient, arr);
  }

  protected abstract doSend(message: string, recipient: string): Promise<void>;
}
