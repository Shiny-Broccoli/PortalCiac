import React from 'react';
import s from './InfoBloque.module.css';

function InfoBloque(infoBloqueProps) {

  const { name, children } = infoBloqueProps;

  return (
    <section className={s.info}>
      <h2>Información turno actual</h2>
      <div className={s.box}>
        <h2>Administrador</h2>
        <span className={ name.length > 30 ? s.nameLargo : s.nameCorto}>{name}</span>
      </div>
      <div className={s.box}>
        <h2>Bloque</h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default InfoBloque;