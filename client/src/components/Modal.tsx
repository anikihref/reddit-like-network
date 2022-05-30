import React, { FC, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import '../css/modal.css'; 


interface ModalProps {
  children?: React.ReactNode;
  isActive: boolean;
  className?: string;
  setIsActive: (arg: boolean | ((arg: boolean) => boolean)) => void;
}

const Modal: FC<ModalProps> = ({ children, isActive, setIsActive, className }) => {
  const modalBackgroundRef = useRef<HTMLDivElement>(null)

  function handleCloseModal(e: React.MouseEvent) {
    if (e.target === modalBackgroundRef.current) {
      setIsActive(false)
    }

  }

  return (

    <CSSTransition in={isActive} timeout={500} classNames='modal' unmountOnExit>
      <div ref={modalBackgroundRef} className='modal' onClick={(e) => handleCloseModal(e)}>
        <div className={`modal__content ${className || ''}`}>
          {children}
        </div>
      </div>
    </CSSTransition>
    
  )
}

export default Modal