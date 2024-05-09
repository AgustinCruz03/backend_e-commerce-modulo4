import { NextFunction, Request, Response } from 'express';

export function LoggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = new Date().toLocaleString();
  console.log(
    `estas en la ruta ${req.url}, realizate una solicitud de tipo ${req.method}, y la fecha/hora que realizaste la solicitud es ${date}`,
  );
  next();
}
