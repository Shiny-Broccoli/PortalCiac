import React from 'react';
import s from './Wrapper.module.css';

function TurnoBox(wrapperProps) {

  const { children } = wrapperProps;

  return (
    <div className={s.wrapper}>
       {children}
    </div>
  );
}

export default TurnoBox;