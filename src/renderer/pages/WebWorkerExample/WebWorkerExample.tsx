import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import DashboardLayout from 'renderer/layouts/dashboard';

import MagicSquares from 'renderer/pages/WebWorkerExample/MagicSquares';

import './style.css';

import WorkerBuilder from 'renderer/pages/WebWorkerExample/utils/worker-builder';
import FiboWorker from 'renderer/pages/WebWorkerExample/worker/fiboWorker';
import TimeWorker from 'renderer/pages/WebWorkerExample/worker/timeWorker';

// import functionCreator from './utils/functionCreator';

const fiboCalc = (numb: number) => {
  let n1 = 0;
  let n2 = 1;
  let somme = 0;

  for (let i = 2; i <= numb; i += 1) {
    somme = n1 + n2;

    n1 = n2;

    n2 = somme;
  }

  const result = numb ? n2 : n1;
  return result;
};

function pauseExecution(milliseconds: number) {
  const pauseUntil = Date.now() + milliseconds;
  while (Date.now() < pauseUntil) {
    // Do nothing and wait
  }
}

const instance = new WorkerBuilder(FiboWorker);
// const tmInstance = new WorkerBuilder(TimeWorker);

const bench: any = {
  started: {},
};

const bench2: any = {
  started: {},
};

// ? WebWorker Example Page
function WebWorkerExample() {
  const [countTo, setCountTo] = useState<number>(500000);
  const [workTime, setWorkTime] = useState<number>(5000); // seconds

  const [workerResult, setWorkerResult] = useState<any>(0);
  const [uiResult, setUiResult] = useState<any>(0);

  const [worker2Result, setWorker2Result] = useState<any>(0);
  const [ui2Result, setUi2Result] = useState<any>(0);

  useEffect(() => {
    instance.onmessage = (message) => {
      if (message) {
        console.log('Worker Sent: ', message.data);
        setWorkerResult({
          execTime: Date.now() - bench.started.worker,
          result: message.data,
        });
      }
    };
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
      instance.terminate();
    };
  }, []);

  const runUI = () => {
    bench.started.ui = Date.now();
    setUiResult('working...');
    setTimeout(() => {
      let rez: any = fiboCalc(countTo);
      rez = {
        execTime: Date.now() - bench.started.ui,
        result: rez,
      };
      setUiResult(rez);
      console.warn('runUI', rez);
    }, 50);
  };

  const runTW = () => {
    bench2.started.ui = Date.now();
    setUi2Result('working...');
    setTimeout(() => {
      console.log('Before pause');
      pauseExecution(workTime); // Pause for 3 seconds
      console.log('After pause');
      setUi2Result('Done');
    }, 50);
  };

  const workSomeTime = () => {
    const tmInstance = new WorkerBuilder(TimeWorker);
    tmInstance.onmessage = (msg) => {
      console.log('Worker Sent: ', msg.data);
      setWorker2Result('Done');
      tmInstance.terminate();
    };
    setWorker2Result('working...');
    bench2.started.worker = Date.now();
    tmInstance.postMessage(workTime);
  };

  return (
    <DashboardLayout title="Web Worker Test001">
      <div className="WebWorkerExample">
        <header className="App-header">
          <MagicSquares />
          <Box>
            <p>
              Web Worker ExecTime: {workerResult?.execTime} |{' '}
              {workerResult?.result}
            </p>
            <p>
              UI ExecTime: {uiResult?.execTime} | {uiResult?.result}
            </p>
            <button
              onClick={() => {
                setWorkerResult('working...');
                bench.started.worker = Date.now();
                instance.postMessage(countTo);
              }}
              type="button"
            >
              Fibonacci Worker
            </button>
            <button onClick={runUI} type="button">
              Fibonacci UI_Thread
            </button>
          </Box>

          <Box>
            <p>worker2Result Status: {worker2Result}</p>
            <p>ui2Result Status: {ui2Result}</p>
            <button onClick={workSomeTime} type="button">
              TimeWorker Worker
            </button>
            <button onClick={runTW} type="button">
              TimeWorker UI_Thread
            </button>
          </Box>
        </header>
      </div>
    </DashboardLayout>
  );
}

export default WebWorkerExample;
