// Modify.js
import React, { useState } from 'react';
import s from './Modify.module.css';

const daysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const hoursOptions = ['1-2', '3-4', '5-6', '7-8'];

function Modify(ModifyProps) {
  const { nombre, cargo, rol, rut, turnos } = ModifyProps;

  const [modifiedAttributes, setModifiedAttributes] = useState({
    nombre,
    cargo,
    rol,
    rut,
    selectedTurnoIndex: -1,
    turnos: turnos.map((turno) => ({ day: turno.split(' ')[0], hour: turno.split(' ')[1] })),
    selectedDay: '',
    selectedHour: '',
    isAddingTurno: false,
  });

  const handleAttributeChange = (attribute, value) => {
    setModifiedAttributes((prevAttributes) => ({ ...prevAttributes, [attribute]: value }));
  };

  const handleDayChange = (e) => {
    handleAttributeChange('selectedDay', e.target.value);
  };

  const handleHourChange = (e) => {
    handleAttributeChange('selectedHour', e.target.value);
  };

  const handleModifyTurnoClick = (index, isAddingTurno) => {
    if (isAddingTurno) {
      setModifiedAttributes((prevAttributes) => ({
        ...prevAttributes,
        selectedTurnoIndex: -1,
        isAddingTurno: !prevAttributes.isAddingTurno,
        selectedDay: '',
        selectedHour: '',
      }));
    } else {
      setModifiedAttributes((prevAttributes) => ({
        ...prevAttributes,
        selectedTurnoIndex: index,
        selectedDay: prevAttributes.turnos[index].day,
        selectedHour: prevAttributes.turnos[index].hour,
        isAddingTurno: false,
      }));
    }
  };

  const handleAddTurno = () => {
    const { selectedDay, selectedHour, turnos } = modifiedAttributes;
    const newTurno = { day: selectedDay, hour: selectedHour };
    handleAttributeChange('turnos', [...turnos, newTurno]);
    handleAttributeChange('selectedDay', '');
    handleAttributeChange('selectedHour', '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., update tutor attributes)
    console.log('Modified attributes:', modifiedAttributes);
  };

  return (
    <div className={s.info}>
      <form onSubmit={handleFormSubmit}>
        <div className={s.text}>
          <label className={s.textbold}>Nombre:</label>
          <text>{nombre}</text>
        </div>
        <div className={s.text}>
          <label className={s.textbold}>Cargo:</label>
          <text>{cargo}</text>
        </div>
        <div className={s.text}>
          <label className={s.textbold}>Rol:</label>
          <text>{rol}</text>
        </div>
        <div className={s.text}>
          <label className={s.textbold}>Rut:</label>
          <text>{rut}</text>
        </div>
        <div className={s.text}>
          <label className={s.textbold}>Turnos:</label>
          <ul>
            {modifiedAttributes.turnos.map((turno, index) => (
              <li key={index}>
                {`${turno.day} ${turno.hour}`}
                <button type="button" onClick={() => handleModifyTurnoClick(index, false)}>
                  Modificar
                </button>
              </li>
            ))}
          </ul>
          
        </div>
        {modifiedAttributes.isAddingTurno && (
            <>
              <div className={s.text}>
                <label className={s.textbold}>Día:</label>
                <select value={modifiedAttributes.selectedDay} onChange={handleDayChange}>
                  <option value="">Select Day</option>
                  {daysOptions.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className={s.text}>
                <label className={s.textbold}>Hora:</label>
                <select value={modifiedAttributes.selectedHour} onChange={handleHourChange}>
                  <option value="">Select Hour</option>
                  {hoursOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <button type="button" onClick={handleAddTurno}>
                Add Turno
              </button>
            </>
          )}
        <button type="button" onClick={() => handleModifyTurnoClick(-1, true)}>
          {modifiedAttributes.isAddingTurno ? 'Cancelar' : 'Añadir Turno'}
        </button>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default Modify;
