/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import './Accordion.scss';

const Accordion = ({
  children,
  label,
  defaultOpen = true,
}: {
  children: JSX.Element;
  label: string | JSX.Element;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      <div
        className="accordion_header"
        role="presentation"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label || <h4>&quot;Missing Label&quot;</h4>}
        {isOpen ? <h4>V</h4> : <h4>{'<'}</h4>}
      </div>
      {isOpen && <div className="accordion_content">{children}</div>}
    </div>
  );
};

Accordion.defaultProps = {
  defaultOpen: true,
};

export default Accordion;
