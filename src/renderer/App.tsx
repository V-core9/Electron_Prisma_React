import { StrictMode, Suspense } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import routes from './config/routes';

export default function App() {
  return (
    <StrictMode>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((val, index) => (
              <Route
                path={val.path}
                element={val.elem}
                // eslint-disable-next-line react/no-array-index-key
                key={`${val.path}-${index}`}
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </StrictMode>
  );
}
