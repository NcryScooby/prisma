import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import { SchemaOf, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<T>;

type TAllSchemas = Record<TProperty, SchemaOf<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
      } catch (err) {
        const yupError = err as ValidationError;
        const error: Record<string, string> = {};

        yupError.inner.forEach((err) => {
          if (!err.path) return;
          error[err.path] = err.message;
        });

        errorsResult[key] = error;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: errorsResult,
      });
    }
  };
