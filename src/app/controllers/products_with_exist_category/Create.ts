import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export const create = async (
  req: Request<
    {},
    {},
    Product & {
      categoryId: string;
    }
  >,
  res: Response
) => {
  const { name, price, barCode, categoryId } = req.body;

  const category = await prismaClient.productCategory.create({
    data: {
      product: {
        create: {
          name,
          barCode,
          price,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });

  return res.status(201).json(category);
};
