import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const filter = req.query.filter || "";

  const totalPages = Math.ceil(
    (await prismaClient.category.count()) / Number(limit)
  );

  const filterTotalPages = Math.ceil(
    (await prismaClient.category.count({
      where: {
        name: {
          contains: filter,
        },
      },
    })) / Number(limit)
  );

  if (page > totalPages) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "Page not found",
    });
  }

  const categories = await prismaClient.category.findMany({
    where: {
      name: {
        contains: filter,
      },
    },
    orderBy: {
      name: "asc",
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });

  return res.status(StatusCodes.OK).json({
    categories,
    totalPages: filter ? filterTotalPages : totalPages,
    currentPage: Number(page),
  });
};
