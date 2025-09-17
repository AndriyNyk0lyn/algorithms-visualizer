import type { PaymentClient } from "./Adapter";

class InventoryService {
  private stock = new Map<string, number>([["sku-abc", 3]]);
  reserve(sku: string, qty: number) {
    const left = (this.stock.get(sku) ?? 0) - qty;
    if (left < 0) throw new Error("Out of stock");
    this.stock.set(sku, left);
  }
}

class EmailService {
  async send(to: string, subject: string, body: string) {
    console.log(`${subject} to ${to}: ${body}`);
  }
}

export class CheckoutFacade {
  private inventory: InventoryService;
  private email: EmailService;
  private payments: PaymentClient;
  constructor(
    inventory = new InventoryService(),
    email = new EmailService(),
    payments: PaymentClient
  ) {
    this.inventory = inventory;
    this.email = email;
    this.payments = payments;
  }

  async checkout(userEmail: string, sku: string, qty: number, token: string) {
    this.inventory.reserve(sku, qty);
    const paymentId = await this.payments.charge(2999 * qty, "USD", token);
    await this.email.send(
      userEmail,
      "Order confirmed",
      `Your payment ${paymentId} is confirmed.`
    );
    return paymentId;
  }
}
