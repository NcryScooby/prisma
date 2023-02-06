import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prismaClient.category.findUnique({
    where: {
      id,
    },
  });

  return res.status(200).json(category);
};
