import { NextFunction } from "express";
import { ZodError, ZodObject, ZodRawShape } from "zod";

export function ZodBodyValidator<T extends ZodRawShape>(schema: ZodObject<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        req.body
        next();
      } catch (err) {
        let message = 'Validation Failed';
        let details: any = {};
  
        if (err instanceof ZodError) {
          message = `Validation failed: ${err.issues.length} errors detected in body`;
          details = err.issues;
        }
  
        const badReqError = new BadRequestError(message);
        badReqError.details = details;
  
        next(badReqError);
      }
    };
  }