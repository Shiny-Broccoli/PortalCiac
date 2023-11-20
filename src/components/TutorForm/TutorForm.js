// TutorForm.js
import React, { useState } from 'react';
import s from './TutorForm.module.css';

const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hoursOptions = ['1-2', '3-4', '5-6', '7-8'];

function TutorForm({ onClose, onSave }) {
  const [tutorAttributes, setTutorAttributes] = useState({
    nombre: '',
    tipoTutor: '',
    rol: '',
    rut: '',
    turnos: [],
    selectedDay: '',
    selectedHour: '',
  });

  const handleAttributeChange = (attribute, value) => {
    setTutorAttributes((prevAttributes) => ({ ...prevAttributes, [attribute]: value }));
  };

  const handleDayChange = (e) => {
    handleAttributeChange('selectedDay', e.target.value);
  };

  const handleHourChange = (e) => {
    handleAttributeChange('selectedHour', e.target.value);
  };

  const handleAddTurno = () => {
    const { selectedDay, selectedHour, turnos } = tutorAttributes;
    setTutorAttributes((prevAttributes) => ({
      ...prevAttributes,
      turnos: [...turnos, { day: selectedDay, hour: selectedHour }],
      selectedDay: '',
      selectedHour: '',
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(tutorAttributes);
  };

  return (
    <div className={s.overlay}>
      <div className={s.form}>
        <h2>Añadir Tutor</h2>
        <form onSubmit={handleFormSubmit}>
          <label>Nombre:</label>
          <input type="text" value={tutorAttributes.nombre} onChange={(e) => handleAttributeChange('nombre', e.target.value)} />

          <label>Tipo de Tutor:</label>
          <input type="text" value={tutorAttributes.tipoTutor} onChange={(e) => handleAttributeChange('tipoTutor', e.target.value)} />

          <label>Rol:</label>
          <input type="text" value={tutorAttributes.rol} onChange={(e) => handleAttributeChange('rol', e.target.value)} />

          <label>Rut:</label>
          <input type="text" value={tutorAttributes.rut} onChange={(e) => handleAttributeChange('rut', e.target.value)} />

          <label>Turnos:</label>
          <ul>
            {tutorAttributes.turnos.map((turno, index) => (
              <li key={index}>{`${turno.day} ${turno.hour}`}</li>
            ))}
          </ul>
          <div>
            <label>Día:</label>
            <select value={tutorAttributes.selectedDay} onChange={handleDayChange}>
              <option value="">Select Day</option>
              {daysOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <label>Hora:</label>
            <select value={tutorAttributes.selectedHour} onChange={handleHourChange}>
              <option value="">Select Hour</option>
              {hoursOptions.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddTurno}>
              Add Turno
            </button>
          </div>

          <button type="submit">Guardar Tutor</button>
        </form>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

export default TutorForm;
