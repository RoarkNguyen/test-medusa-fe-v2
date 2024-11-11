import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { CreateBrandInput } from "..";
import { BRAND_MODULE } from "../../../modules/brand";
import BrandModuleService from "../../../modules/brand/service";

export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandInput, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    const brand = await brandModuleService.createBrands(input);
    console.log("created brand");
    return new StepResponse(brand, brand.id);
  },

  async (id: string, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);
    console.log("delete brand");
    await brandModuleService.deleteBrands(id);
  }
);
