/* eslint-disable max-classes-per-file */
const prepFunc = (func: () => void) => {
  const str = func.toString();
  console.log(str);

  const resp = [
    `(
    const func = (...args) => ${str};

    onmessage = (message) => {
      const data = message.data;
      // Usage
      console.log('TimeWorker > Before pause');
      func(data);
      console.log('TimeWorker > After pause');

      postMessage('done');
    };
  )()`,
  ];

  return resp;
};

export default class WorkerBuilder extends Worker {
  constructor(worker: () => void) {
    super(worker as unknown as string);
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    return new Worker(URL.createObjectURL(blob));
  }
}

export class WorkerBuilderFunc extends Worker {
  constructor(worker: () => void) {
    super(worker as unknown as string);
    const blob = new Blob([prepFunc(worker) as unknown as BlobPart]);
    return new Worker(URL.createObjectURL(blob));
  }
}
