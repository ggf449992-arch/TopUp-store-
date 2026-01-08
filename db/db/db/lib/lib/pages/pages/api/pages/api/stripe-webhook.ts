import { buffer } from "micro"; import Stripe from "stripe"; import { shipOrder } from "@/lib/shipping";
export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export default async function handler(req:any, res:any){
  const body = await buffer(req); const sig = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;
    await shipOrder(session.metadata.provider, session.metadata.playerId, session.metadata.itemId);
  }
  res.json({ received: true });
}
