import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "./../../middleware/Validation";

interface IBodyProps extends Omit<Category, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Category>, res: Response) => {
  const { name } = req.body;

  const categoryExists = await prismaClient.category.findFirst({
    where: {
      name,
    },
  });

  if (categoryExists) {
    return res.status(StatusCodes.CONFLICT).json({
      message: "Category already exists",
    });
  }

  const category = await prismaClient.category.create({
    data: {
      name,
    },
  });

  return res.status(StatusCodes.CREATED).json(category);
};
