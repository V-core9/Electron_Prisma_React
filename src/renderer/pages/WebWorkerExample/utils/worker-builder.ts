export default class WorkerBuilder extends Worker {
  constructor(worker: string | URL) {
    super(worker);
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    return new Worker(URL.createObjectURL(blob));
  }
}
