/* eslint-disable no-console */
const prepFunc = (func: WorkerFunction) => {
  const str = func.toString();
  const { name } = func;

  const resp = `
    let func = ${str};
    
    onmessage = (message) => {
      console.log('WW function ${name}', message);
      let resp = {
        data: null,
        status: null,
      };
      try { 
        resp.data = func(message?.data);
        resp.status = 'ok';
      } catch (err) {
        resp.status = 'error';
        resp.data = err;
      }
      postMessage(resp);
    };`;

  return resp;
};

class WorkerBuilder extends Worker {
  constructor(worker: WorkerFunction) {
    super(worker as unknown as string);
    const blob = new Blob([prepFunc(worker)]);
    return new Worker(URL.createObjectURL(blob));
  }
}

const availableCpuCores = navigator.hardwareConcurrency - 1;
let workerCount: any = 0;

interface NewWorkerOptions {
  timeout?: number;
}

type WorkerFunction = (args: any) => any;

export default function newWorker(
  func: WorkerFunction,
  args: unknown,
  options: NewWorkerOptions = {}
) {
  if (workerCount >= availableCpuCores) return new Error('reached max workers');

  const timeout = options.timeout || 60000;

  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    const tmInstance = new WorkerBuilder(func);
    workerCount += 1;

    const timeoutTimer = setTimeout(() => {
      tmInstance.terminate();
      workerCount -= 1;
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ data: 'timeout error', status: 'error' });
    }, timeout);

    tmInstance.onmessage = (msg) => {
      console.log('Worker Sent: ', msg.data);
      tmInstance.terminate();
      workerCount -= 1;
      clearTimeout(timeoutTimer);
      resolve(msg.data);
    };

    tmInstance.postMessage(args);
  });
}
