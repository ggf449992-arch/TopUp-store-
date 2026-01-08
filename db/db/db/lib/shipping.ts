import axios from "axios";
export async function shipOrder(provider:string,playerId:string,itemId:string){
  if(provider==="smileone"){ await axios.post("https://www.smile.one/api/v2/topup",{uid:playerId,product_id:itemId},{headers:{Authorization:`Bearer ${process.env.SMILEONE_KEY}`}}); }
}
