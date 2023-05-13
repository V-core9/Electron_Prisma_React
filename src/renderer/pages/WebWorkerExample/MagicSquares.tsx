/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';

export default function MagicSquares() {
  const [chosen, setChosen] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChosen(Math.floor(Math.random() * 9));
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  function renderSquares() {
    return Array(3)
      .fill(0)
      .map((_, i) => {
        return (
          <div style={{ display: 'flex' }} key={`outer-${i}`}>
            {Array(3)
              .fill(0)
              .map((_$, j) => {
                const n = i * 3 + j;
                const style = {
                  backgroundColor: chosen === n ? '#dd4444' : '#ccc',
                };

                return <div className="square" style={style} key={n} />;
              })}
          </div>
        );
      });
  }

  return <div>{renderSquares()}</div>;
}
