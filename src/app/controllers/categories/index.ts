import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./getById";
import * as deleteById from "./DeleteById";

export const CategoriesController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
};
