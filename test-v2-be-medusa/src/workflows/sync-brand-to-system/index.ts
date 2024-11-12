import { InferTypeOf } from "@medusajs/framework/types";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { Brand } from "src/modules/brand/models/brand";
import { retrieveBrandsFromSystemStep } from "./steps/retrieve-brands-from-system";
import { createBrandsStep } from "./steps/create-brands";
import { updateBrandsStep } from "./steps/update-brands";

export type SyncBrandToSystemInput = {
  id: string;
};

export const syncBrandToSystemWorkflow = createWorkflow(
  "sync-brand-to-system",
  (input: SyncBrandToSystemInput) => {
    // ...
  }
);

export const syncBrandsFromSystemWorkflow = createWorkflow(
  "sync-brands-from-system",
  () => {
    const brands = retrieveBrandsFromSystemStep();

    const { toCreate, toUpdate } = transform(
      {
        brands,
      },
      (data) => {
        const toCreate: InferTypeOf<typeof Brand>[] = [];
        const toUpdate: InferTypeOf<typeof Brand>[] = [];

        data.brands.forEach((brand) => {
          if (brand.external_id) {
            toUpdate.push({
              ...brand,
              id: brand.external_id,
            });
          } else {
            toCreate.push(brand);
          }
        });

        return { toCreate, toUpdate };
      }
    );

    const created = createBrandsStep({ brands: toCreate });
    const updated = updateBrandsStep({ brands: toUpdate });

    return new WorkflowResponse({
      created,
      updated,
    });
  }
);
