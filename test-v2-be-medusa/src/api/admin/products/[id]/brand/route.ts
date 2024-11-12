import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

// An example of retrieving the products of a brand:

// const query = req.scope.resolve(
//     ContainerRegistrationKeys.QUERY
//   )

//   const { data: [brand] } = await query.graph({
//     entity: "brand",
//     fields: ["products.*"],
//     filters: {
//       id: req.params.id,
//     },
//   })

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const {
    data: [product],
  } = await query.graph({
    entity: "product",
    fields: ["brand.*"],
    filters: {
      id: req.params.id,
    },
  });

  res.json({ brand: product.brand });
};
