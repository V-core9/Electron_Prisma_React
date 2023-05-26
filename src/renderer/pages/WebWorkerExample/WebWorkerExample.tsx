import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import DashboardLayout from 'renderer/layouts/dashboard';

import MagicSquares from 'renderer/pages/WebWorkerExample/MagicSquares';

import './style.css';

import newWorker from 'renderer/pages/WebWorkerExample/utils/newWorker';

function pauseExecution(milliseconds: number) {
  const pauseUntil = Date.now() + milliseconds;
  while (Date.now() < pauseUntil) {
    // Do nothing and wait
  }
  return milliseconds;
}

// ? WebWorker Example Page
function WebWorkerExample() {
  const [workTime, setWorkTime] = useState<number>(5000); // seconds

  const [workerResult, setWorkerResult] = useState<any>(0);
  const [uiResult, setUiResult] = useState<any>(0);

  const runUI = () => {
    console.log(pauseExecution(workTime));
  };

  const runW = async () => {
    // eslint-disable-next-line prettier/prettier
    try {
      setWorkerResult(
        await newWorker(pauseExecution, Math.floor(Math.random() * 10000), {
          timeout: 5000,
        })
      );
    } catch (error) {
      setWorkerResult(error);
    }
  };

  useEffect(() => {
    console.info('workerResult', workerResult);
  }, [workerResult]);

  return (
    <DashboardLayout title="Web Worker Test001">
      <div className="WebWorkerExample">
        <header className="App-header">
          <MagicSquares />
          <Box>
            <p>
              Web Worker ExecTime: {workerResult?.data} | {workerResult?.status}
            </p>
            <p>
              UI ExecTime: {uiResult?.execTime} | {uiResult?.result}
            </p>
            <button onClick={runW} type="button">
              Worker RUN
            </button>
            <button onClick={runUI} type="button">
              UI_Thread RUN
            </button>
          </Box>
        </header>
      </div>
    </DashboardLayout>
  );
}

export default WebWorkerExample;
