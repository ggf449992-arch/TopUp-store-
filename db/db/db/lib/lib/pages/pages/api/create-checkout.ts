import Stripe from "stripe"; import { getPackageById, createOrder } from "@/db/queries";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export default async function handler(req:any, res:any){
  const { playerId, packageId } = req.body;
  const pkg = await getPackageById(Number(packageId));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "usd", product_data: { name: "Gems" }, unit_amount: 100 }, quantity: 1 }],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    metadata: { playerId, itemId: pkg?.itemId || "123", provider: pkg?.provider || "smileone", orderId: "1" }
  });
  res.json({ id: session.id });
}
