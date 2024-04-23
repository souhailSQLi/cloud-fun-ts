import { Request, Response, http } from '@google-cloud/functions-framework';
import { someHelper } from './helpers/helper-fun';

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
export const helloTSHttp = (
  req: Request,
  res: Response,
): Response<string, Record<string, string>> => {
  const { headers } = req;
  if (headers.accept === 'application/json') {
    const helperMsg = someHelper();
    return res.json({ message: 'Hello World from TSS', helperMsg });
  }
  return res.send('Hello World from TSS');
};

http('helloTSHttp', helloTSHttp);
