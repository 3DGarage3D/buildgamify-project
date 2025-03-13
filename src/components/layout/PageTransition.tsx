
import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const nodeRef = React.useRef(null);
  
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={400}
      classNames="page-transition"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div ref={nodeRef} className="w-full">
        {children}
      </div>
    </CSSTransition>
  );
};

export default PageTransition;
