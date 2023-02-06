import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { ProductCategory } from "@prisma/client";

export const create = async (
  req: Request<{}, {}, ProductCategory>,
  res: Response
) => {
  const { productId, categoryId } = req.body;

  const productCategory = await prismaClient.productCategory.create({
    data: { productId, categoryId },
  });

  return res.status(201).json(productCategory);
};
