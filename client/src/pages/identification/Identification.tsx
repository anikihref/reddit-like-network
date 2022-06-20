import React from 'react';
import BlueButton from '../../components/BlueButton';

const Identification = () => {
  return (
    <div className="login-page__select-login-type">
        

      <div className="login-page__title-block">
        <h2 className="login-page__title-text">Підтвердження особистості</h2>
      </div>

      <div className="buttons-block">
        <BlueButton to='/identification/register' btnType='link' >Зареєструватись</BlueButton>

        <BlueButton to='/identification/login' btnType='link'>Увійти</BlueButton>
      </div>
    </div>
  );
};

export default Identification;
