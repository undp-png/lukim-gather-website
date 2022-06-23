import React, {useState, useRef} from 'react';
import {FiChevronRight} from 'react-icons/fi';

import './styles.scss';

const FaqAccordion = ({question, answer}: {question: string, answer: string}) => {
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState('0px');

  const content = useRef<any>(null);

  function toggleAccordion() {
    setOpen(!open);
    setContentHeight(
      open ? '0px' : `${content.current.scrollHeight}px`,
    );
  }

  return (
    <div className='container'>
      <div className={`accordion-section ${open && 'active'}`}>
        <button type='button' className='accordion' onClick={toggleAccordion}>
          <p className={`accordion-title font-interMedium ${open && 'active-title'}`}>{question}</p>
          <FiChevronRight className={`down-icon ${open ? 'rotate-up' : ''}`} />
        </button>
        <div
          ref={content}
          style={{maxHeight: `${contentHeight}`}}
          className='accordion-content'
        >
          <div
            className='accordion-text font-inter'
          >
            <div>{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;
