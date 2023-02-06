import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { Category } from "@prisma/client";

export const create = async (req: Request<{}, {}, Category>, res: Response) => {
  const { name } = req.body;

  const category = await prismaClient.category.create({
    data: {
      name,
    },
  });

  return res.status(201).json(category);
};
