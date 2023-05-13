import { useEffect, useState } from 'react';

import DashboardLayout from 'renderer/layouts/dashboard';

import MagicSquares from 'renderer/pages/WebWorkerExample/MagicSquares';

import './style.css';

import WorkerBuilder from 'renderer/pages/WebWorkerExample/utils/worker-builder';
import FiboWorker from 'renderer/pages/WebWorkerExample/worker/fiboWorker';

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

const instance = new WorkerBuilder(FiboWorker);

const bench: any = {
  started: {},
};

// ? WebWorker Example Page
function WebWorkerExample() {
  const [countTo, setCountTo] = useState<number>(5000);

  const [workerResult, setWorkerResult] = useState<any>(0);
  const [uiResult, setUiResult] = useState<any>(0);

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
    }, 200);
  };

  return (
    <DashboardLayout title="Web Worker Test001">
      <div className="WebWorkerExample">
        <header className="App-header">
          <MagicSquares />
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
            Trigger Worker
          </button>
          <button onClick={runUI} type="button">
            Trigger UI_Thread
          </button>
        </header>
      </div>
    </DashboardLayout>
  );
}

export default WebWorkerExample;
