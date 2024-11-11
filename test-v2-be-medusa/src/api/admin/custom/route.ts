import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import CartModule from "@medusajs/medusa/cart";
import user from "@medusajs/medusa/commands/user";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  CartModule;
  res.sendStatus(200);
}
