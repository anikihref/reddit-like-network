import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import '../css/blue-btn.css'

interface BlueAnimatedButtonProps {
  text: string;
  cb?: (arg: any) => any;
  btnType: 'link' | 'button';
  to?: string;
  className?: string;
}

const BlueButton: FC<BlueAnimatedButtonProps> = ({ text, cb, btnType, to, className }) => {
  return (
    <>
      {btnType === 'button' ? (
        <button onClick={cb ? cb : () => {}} className={`blue-btn ${className ? className : ''}`}>
          <span className="blue-btn__text">{text}</span>
        </button>
      ) : 
      <Link to={to!} onClick={cb ? cb : () => {}} className="blue-btn">
          <span className="blue-btn__text">{text}</span>
      </Link>}
    </>
  );
};

export default BlueButton;
