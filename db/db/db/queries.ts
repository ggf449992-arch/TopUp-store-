import { db } from "./index"; import { eq } from "drizzle-orm"; import { packages, orders } from "./schema";
export const getPackageById=(id:number)=>db.query.packages.findFirst({where:eq(packages.id,id)});
export const createOrder=(data:any)=>db.insert(orders).values(data).execute();
export const getOrderById=(id:number)=>db.query.orders.findFirst({where:eq(orders.id,id)});
export const updateOrderStatus=(id:number,status:any)=>db.update(orders).set({status}).where(eq(orders.id,id)});
