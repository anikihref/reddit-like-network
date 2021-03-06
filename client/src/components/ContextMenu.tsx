import React, { FC, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../css/context-menu.css'
import { addContextMenu, removeContextMenuCloser } from '../helpers/contextMenuCloser';

interface ContextMenuProps {
  children: React.ReactNode;
  isActive: boolean;
  setIsActive: (arg: boolean) => void
}

const ContextMenu: FC<ContextMenuProps> = ({ children, isActive, setIsActive }) => {
  const contextMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    addContextMenu(setIsActive, contextMenuRef)
  }, [])


  return (
    <CSSTransition in={isActive} timeout={200} classNames='context-menu'>
      <div ref={contextMenuRef} className="context-menu">
        {children}
      </div>
    </CSSTransition>
  );
};

export default ContextMenu;
