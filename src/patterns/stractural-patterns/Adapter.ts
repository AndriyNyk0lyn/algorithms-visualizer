export interface PaymentClient {
  charge(cents: number, currency: string, token: string): Promise<string>; // returns paymentId
}

class StripeLikeSDK {
  async pay(amountInCents: number, currency: string, source: string) {
    console.log(
      `Stripe: charging ${amountInCents} cents for ${currency} from ${source}`
    );
    return `stripe_${Math.random()}`;
  }
}
class PaypalLikeSDK {
  async makePayment(amount: number, code: string, curr: string) {
    console.log(`Paypal: charging ${amount} for ${curr} with code ${code}`);
    return { id: `pp_${Math.random()}` };
  }
}

export class StripeAdapter implements PaymentClient {
  private sdk: StripeLikeSDK;
  constructor(sdk = new StripeLikeSDK()) {
    this.sdk = sdk;
  }
  async charge(
    cents: number,
    currency: string,
    token: string
  ): Promise<string> {
    return this.sdk.pay(cents, currency, token);
  }
}

export class PaypalAdapter implements PaymentClient {
  private sdk: PaypalLikeSDK;
  constructor(sdk = new PaypalLikeSDK()) {
    this.sdk = sdk;
  }
  async charge(
    cents: number,
    currency: string,
    token: string
  ): Promise<string> {
    const res = await this.sdk.makePayment(cents, token, currency);
    return res.id;
  }
}

async function demo(p: PaymentClient) {
  const id = await p.charge(1999, "USD", "tok_abc");
  console.log("payment id:", id);
}
demo(new StripeAdapter());
demo(new PaypalAdapter());
