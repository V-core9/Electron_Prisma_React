export default () => {
  function pauseExecution(milliseconds) {
    const pauseUntil = Date.now() + milliseconds;
    while (Date.now() < pauseUntil) {
      // Do nothing and wait
    }
  }

  onmessage = (message) => {
    const worktime = message.data;
    // Usage
    console.log('TimeWorker > Before pause');
    pauseExecution(worktime);
    console.log('TimeWorker > After pause');

    postMessage('done');
  };
};
