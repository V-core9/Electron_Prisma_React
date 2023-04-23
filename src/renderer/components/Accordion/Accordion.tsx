/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="accordion">
      <div
        className="accordion_header"
        role="presentation"
        onClick={toggleOpen}
      >
        <h4>{label || '&quot;Missing Label&quot'}</h4>

        <IconButton onClick={toggleOpen}>
          {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </div>
      {isOpen && <div className="accordion_content">{children}</div>}
    </div>
  );
};

Accordion.defaultProps = {
  defaultOpen: true,
};

export default Accordion;
