// NameList.js
import React, { useState } from 'react';
import OpenNameList from '../OpenNameList/OpenNameList';
import Modify from '../Modify/Modify';
import s from './NameList.module.css';

function NameList(NameListProps) {
  const { name, tipoTutor, rol, rut, turnos, onDelete, onModify } = NameListProps;

  const [ventanaAbierta, setVentanaAbierta] = useState(false);
  const [ventanaModifyAbierta, setVentanaModifyAbierta] = useState(false);

  const toggleVentana = () => {
    setVentanaAbierta(!ventanaAbierta);
  };

  const toggleVentanaModify = () => {
    setVentanaModifyAbierta(!ventanaModifyAbierta);
  };

  return (
    <section className={s.open}>
      <div className={`${s.list} ${ventanaAbierta ? s.listAbierta : ''}`}>
        <div className={s.rotulo}>
          <text className={s.name}>{name}</text>
          <text className={s.type}>{tipoTutor}</text>
        </div>
        <button className={s.icon} onClick={toggleVentanaModify}>
          <img src="Pencil.png" alt="Lapiz" />
        </button>
        <button className={s.icon} onClick={() => onDelete(name)}>
          Delete
        </button>
        {!ventanaAbierta && (
          <button className={s.icon} onClick={toggleVentana}>
            <img src="Arroy-Down.svg" alt="Flecha hacia abajo" />
          </button>
        )}
        {ventanaAbierta && (
          <button className={s.icon} onClick={toggleVentana}>
            <img src="Arroy-Up.svg" alt="Flecha hacia abajo" />
          </button>
        )}
      </div>
      {ventanaModifyAbierta && <Modify nombre={name} cargo={tipoTutor} rol={rol} rut={rut} turnos={turnos} onModify={onModify} />}
      {ventanaAbierta && <OpenNameList nombre={name} cargo={tipoTutor} rol={rol} rut={rut} turnos={turnos} />}
    </section>
  );
}

export default NameList;
