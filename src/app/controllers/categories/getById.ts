import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoryExists = await prismaClient.category.findUnique({
    where: {
      id,
    },
  });

  if (!categoryExists) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Category not found",
    });
  }

  const category = await prismaClient.category.findUnique({
    where: {
      id,
    },
  });

  return res.status(StatusCodes.OK).json(category);
};
