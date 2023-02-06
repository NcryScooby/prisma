import {
  Product_Category_Controller,
  CategoriesController,
  ProductsController,
  ProductWithExistsCategory,
} from "./app/controllers";
import { Router } from "express";

export const router = Router();

router.post("/product", ProductsController.create);

router.post(
  "/category",
  CategoriesController.createValidation,
  CategoriesController.create
);
router.get("/category", CategoriesController.getAll);
router.get("/category/:id", CategoriesController.getCategoryById);

router.post("/product_category", Product_Category_Controller.create);

router.post("/product_with_exist_category", ProductWithExistsCategory.create);
