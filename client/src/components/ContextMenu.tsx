import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../css/context-menu.css'

interface ContextMenuProps {
  children: React.ReactNode;
  isActive: boolean;
}

const ContextMenu: FC<ContextMenuProps> = ({ children, isActive }) => {

  return (
    <CSSTransition in={isActive} timeout={200} classNames='context-menu'>
      <div className="context-menu">
        {children}
      </div>
    </CSSTransition>
  );
};

export default ContextMenu;
