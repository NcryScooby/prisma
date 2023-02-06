import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getCategoryById from "./getCategoryById";

export const CategoriesController = {
  ...create,
  ...getAll,
  ...getCategoryById,
};
