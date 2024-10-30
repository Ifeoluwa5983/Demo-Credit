import { Response } from 'express';
import Helper from '../utils/helper';

export const errorResponse = async (res: Response, err: any, code: number) => {
  const capitalizedErrorMessage = err.message
    ? await Helper.capitalize(err.message)
    : await Helper.capitalize(err);
  return res.status(code).json({
    status: 'error',
    code: code,
    message: capitalizedErrorMessage,
  });
};

export const success = (
  res: Response,
  message: string,
  code: number,
  data?: any
) => {
  return res.status(code).json({
    status: 'success',
    message,
    code,
    data,
  });
};
