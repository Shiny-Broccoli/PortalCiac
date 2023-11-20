
import s from './Coordinador.module.css';
import NameList from '../components/NameList/NameList';
import Header from "../components/Header/Header";
import React, { useState } from 'react';
import TutorForm from '../components/TutorForm/TutorForm';



function Coordinador() {

  const [tutores, setTurores] = useState([
    {
      nombre: "Vicente Luongo",
      tipoTutor: "Tutor/a Programación",
      rol : "202111555-5",
      rut : "12345678-9",
      turnos : ["Miercoles 3-4", "Jueves 5-6"],
    },
    {
      nombre: "Christian Barrios",
      tipoTutor: "Tutor/a Programación",
      rol : "202022555-6",
      rut : "11223344-9",
      turnos : ["Miercoles 3-4", "Miercoles 5-6", "Jueves 5-6"],
    },
    {
      nombre: "Sofía Ríos",
      tipoTutor: "Tutor/a Programación",
      rol : "202123456-7",
      rut : "55667788-9",
      turnos : ["lunes 1-2", "viernes 7-8"],
    },
  ]);

  const [isAddingTutor, setIsAddingTutor] = useState(false);

  const handleAddTutorClick = () => {
    setIsAddingTutor(true);
  };

  const handleSaveTutor = (newTutor) => {
    setTurores((prevTutores) => [...prevTutores, newTutor]);
    setIsAddingTutor(false);
  };

  const handleCancelAddTutor = () => {
    setIsAddingTutor(false);
  };

  const handleModifyTutor = (tutorIndex, modifiedAttributes) => {
    setTurores((prevTutores) => {
      const newTutores = [...prevTutores];
      newTutores[tutorIndex] = { ...newTutores[tutorIndex], ...modifiedAttributes };
      return newTutores;
    });
  };

  const handleDeleteTutor = (tutorName) => {
    setTurores((prevTutores) => prevTutores.filter((tutor) => tutor.nombre !== tutorName));
    //logica para eliminar tutor de la base de datos
  };

  return (
    <>
      <Header />
      <section className={s.wrapper}>
        <h1>¡Bienvenido/a</h1>
        <div className={s.list}>
          <p>Lista de tutores y administradores</p>
          
          {tutores.map((tutor, index) => (
            <NameList
              key={index}
              name={tutor.nombre}
              tipoTutor={tutor.tipoTutor}
              rol={tutor.rol}
              rut={tutor.rut}
              turnos={tutor.turnos}
              onModify={(modifiedAttributes) => handleModifyTutor(index, modifiedAttributes)}
              onDelete={handleDeleteTutor}
            />
          ))}
          <button className={s.button} onClick={handleAddTutorClick}>
            Añadir tutor
          </button>
        </div>
      </section>

      {isAddingTutor && (
        <TutorForm onClose={handleCancelAddTutor} onSave={handleSaveTutor} />
      )}
    </>
  );
}

export default Coordinador;