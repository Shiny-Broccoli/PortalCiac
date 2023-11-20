import React from 'react';
import s from './LogoName.module.css';

function LogoName(logoNameProps) {

  const { name, tipoTutor } = logoNameProps;

  const inicial = name.charAt(0);

  return (
    <section className={tipoTutor === 'Tutor/a Mat/Fis' ? s.azul : tipoTutor === 'Tutor/a Programación' ? s.verde : tipoTutor === 'Tutor/a de Química' ? s.rosado : tipoTutor === 'Admin' ? s.amarillo : s.gris }>
      {inicial}
    </section>
  );
}

export default LogoName;
