import { useState } from "react"; import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51SnNJtC3zJB9gFGMfqaHeWFQfAmRl7kY6QvZLcJZMPTOLfPuvTJXLkkCHmdw6GHHIUf7IVZ8Nuiuc2LazBW3wNFW002L5AqvEd");
export default function Home(){
  const [pId, setPId] = useState("");
  const handlePay = async (pkgId: number) => {
    const res = await fetch("/api/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerId: pId, packageId: pkgId }) });
    const session = await res.json();
    const stripe = await stripePromise;
    await stripe!.redirectToCheckout({ sessionId: session.id });
  };
  return (<div className="bg-black text-white min-h-screen p-10 text-center">
    <h1 className="text-3xl font-bold">متجر الشحن</h1>
    <input className="mt-5 p-2 text-black" placeholder="ID اللاعب" onChange={(e)=>setPId(e.target.value)}/>
    <button onClick={()=>handlePay(1)} className="block mx-auto mt-5 bg-blue-500 p-3 rounded">شحن 100 جوهرة ($1)</button>
  </div>);
}
