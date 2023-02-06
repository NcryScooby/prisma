import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { Product } from "@prisma/client";

export const create = async (req: Request<{}, {}, Product>, res: Response) => {
  const { name, price, barCode } = req.body;

  const product = await prismaClient.product.create({
    data: {
      name,
      price,
      barCode,
    },
  });

  return res.status(201).json(product);
};
