import { ZodError, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        res.status(400).json({ errors });
      } else {
        next(err);
      }
    }
  };
