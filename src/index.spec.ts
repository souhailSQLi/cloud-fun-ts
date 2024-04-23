import assert from 'assert';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getFunction } from '@google-cloud/functions-framework/testing';
import {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework';

describe('HelloTests', () => {
  before(async () => {
    // load the module that defines HelloTests
    await import('../dist/index.js');
  });

  it('is returning text', () => {
    // get the function using the name it was registered with
    const HelloTest = getFunction('helloTSHttp') as HttpFunction;

    // a Request stub with a simple JSON payload
    const req = {
      headers: { accept: 'application/text' },
    };
    // a Response stub that captures the sent response
    let result;
    const res = {
      send: (x: unknown) => {
        result = x;
      },
    };

    // invoke the function
    HelloTest?.(req as Request, res as Response);

    // assert the response matches the expected value
    assert.equal(result, 'Hello World from TSS');
  });

  it('is returning json', () => {
    // get the function using the name it was registered with
    const HelloTest = getFunction('helloTSHttp') as HttpFunction;

    // a Request stub with a simple JSON payload
    const req = {
      headers: { accept: 'application/json' },
    };
    // a Response stub that captures the sent response
    let result: { message: string } | undefined;
    const res = {
      json: (x: typeof result) => {
        result = x;
      },
    };

    // invoke the function
    HelloTest?.(req as Request, res as Response);

    // assert the response matches the expected value
    assert.equal(result?.message, 'Hello World from TSS');
  });
});
