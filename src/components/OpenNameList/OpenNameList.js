import React from 'react';
import s from './OpenNameList.module.css';

function OpenNameList(OpenNameListProps) {

  const { nombre, cargo, rol, rut, turnos  } = OpenNameListProps;

  return (
      <div className={s.info}>
        <div className={s.text}>
          <text className={s.textbold}>Nombre: </text>
          <text>{nombre}</text>
        </div>
        <div className={s.text}>
          <text className={s.textbold}>Cargo: </text>
          <text>{cargo}</text>
        </div>
        <div className={s.text}>
          <text className={s.textbold}>Rol: </text>
          <text>{rol}</text>
        </div>
        <div className={s.text}>
          <text className={s.textbold}>Rut: </text>
          <text>{rut}</text>
        </div>
        <div className={s.text}>
          <text className={s.textbold}>Turnos: </text>
          <ul>
            {turnos.map((turno, index) => (
              <li key={index}>{turno}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default OpenNameList;