import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import routes from './config/routes';

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
