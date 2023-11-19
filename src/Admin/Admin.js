import React, { useEffect, useState } from 'react';
import s from './Admin.module.css';
import './ModalReemp.css';
import Header from "../components/Header/Header";
import InfoBloque from "../components/InfoBloque/InfoBloque";
import Turno from "../components/Turno/Turno";
import '../styles.css';
import axios from 'axios';
import {obtenerDatosDeAPI} from "../api/auth"

//const Arreglo = [{"nombre":"Christian Barrios", "estado": "En turno", "tipoTutor" : "Tutor/a de Mat/Fis"}, {"nombre":"Sofia Rios", "estado": "Ausente", "tipoTutor" : "Tutor/a de Mat/Fis"}];


function Admin() {
  const [editing] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [data, setData] = useState([]);
  const [ id, setId ] = useState('');
  const [ rol, setRol ] = useState('');
  const [accessError, setAccessError] = useState(false);
  const [accessSuccess, setAccessSuccess] = useState(false);
  const [ inputError, setInputError ] = useState(false);

  const [ModalR, setModal] = useState(false);
  const [textoEditable, setTextoEditable] = useState("Ingresa tu texto aquí...");


  const changeModal = () => {
    setModal(!ModalR);
  };

  //Abre el modal para ingresar turno manual
  const changeForm = () => {
    setMostrarModal(false);
    setMostrarForm(!mostrarForm);
  };

  //Abre la modal de ingresar turno
  const abrirModal = () => {
    setMostrarModal(true);
  };

  //Cierra la modal de ingresar turno
  const cerrarModal = () => {
    setModal(false);
    setMostrarModal(false);
    setAccessError(false);
    setAccessSuccess(false);
    
  };

  const handleContentEditableClick = (e) => {
    // Detener la propagación del evento para evitar cerrar el modal
    setTextoEditable("");
    e.stopPropagation();
  };


  //Comprueba que el ID exista en la base de datos de los tutores.
  const comprobarId = () => {
    console.log('ID ingresado:', id);

    if(id === ''){
      setInputError(true);
    }

    const comprobacion = true;

    if (comprobacion && id !== ''){
      //consulta a la bd
      setAccessSuccess(true);
    }
    if (!comprobacion && id !== ''){
      setAccessError(true)
    } 
  };

  useEffect(()=>{
    setInputError(false);
    console.log("--------lol-----");
  },[inputError]);

  //Comprueba que el rol exista en la base de datos de los tutores.
  const comprobarRol = () => {
    
    console.log('Rol ingresado:', rol);

    const comprobacion = true;

    if(rol === ''){
      setInputError(true);
    }

    if (comprobacion && rol !== ''){
      setAccessSuccess(true);
    }

    if(!comprobacion && rol !== ''){
      setAccessError(true)
    } 

  };

  //Recupera el ID del input
  const recuperarId = (event) => {
    setId(event.target.value);
  };

  //Recupera el rol del input
  const recuperarRol = (event) => {
    setRol(event.target.value);
  };

  useEffect(() => {
    // Realiza una solicitud GET a la API
    //esta consulta debe mostrar los tutores del turno actual + tutores que estén en reemplazo o en turno.
    obtenerDatosDeAPI(setData);
  }, [accessSuccess]);
  
  return(
    <>
    <Header/>
    <article className={s.wrapper}>
      <div className={s.container}>
        <div className={s.columnTurnos}>
            <h1>Turnos actuales</h1>
            <div className={s.box}>
              <div className={s.turnos}>
              {data.map((item, index) => (         
                <Turno
                  key={index}
                  name={item.name}
                  tipoTutor={item.tipoTutor}
                  state={
                    item.Estado === 0 ? 'Ausente' :
                    item.Estado === 1 ? 'En turno' :
                    item.Estado === 2 ? 'Reemplazado' :
                    'Estado desconocido'
                  }
                />
              ))}
              </div>
        </div>
        <div className={s.columnInfo}>
              <div className={s.block}>
                <InfoBloque name="Axel Kaempffer" bloque="3-4"/>
                <button className={s.button3} onClick={abrirModal}>Ingresar turno</button>
                <button className={s.button3} onClick={changeModal}>Ingresar reemplazo</button>
              </div>
            </div>
            <div>
          </div>
        </div>
      </div>
    {mostrarModal && (
      <div className={`overlay ${mostrarModal ? 'show' : 'hide'}`}>
        <div className={`modal ${mostrarModal ? 'show' : 'hide'}`}>
          <div className='modal-content'>
              <section className={s.modal}>
                <div className={s.title}>
            <h2>Ingresar turno</h2>
            <button onClick={cerrarModal} className={s.icon}>
              <img src="images/close.svg" alt="Icono cerrar"/>
            </button>
          </div>
          <div className={s.box2}>
            <p className={s.subtitle}>Lee el código QR del tutor/a</p>
            <div className={s.codigoQR}>
              <img src="images/codigoQR.png" alt="Imagen de un código QR" className={s.image}/>
              <input type="text" name="id" value={id} onChange={recuperarId} className={`${inputError ? s.inputError : s.input}`}
/>
            </div>
            <div className={s.buttons}>
              <button className={s.button} onClick={comprobarId}>Ingresar</button>
              <button onClick={changeForm} className={s.button2}>Ingresar de forma manual</button>
            </div>
              {accessSuccess && (
                <div className={s.success}>
                  Fue ingresado correctamente
                </div>
              )}
              {accessError && (
                <div className={s.error}>
                  No existe este tutor en nuestra base de datos
                </div>
              )}
          </div>
        </section>
          </div>
       </div>
      </div>
    )}
    {mostrarForm && (
      <div className={`overlay ${mostrarForm ? 'show' : 'hide'}`}>
      <div className={`modal ${mostrarForm ? 'show' : 'hide'}`}>
        <div className='modal-content'>
            <section className={s.form}>
              <div className={s.title}>
          <h2>Ingresar turno manualmente</h2>
          <button onClick={changeForm} className={s.icon}>
            <img src="images/close.svg" alt="Icono cerrar"/>
          </button>
        </div>
        <div className={s.box2}>
          <div className={s.label}>
            <label>Rol:</label>
            <input type="text" name="rol" value={rol} onChange={recuperarRol} className={`${inputError ? s.inputError : s.input}`}/>
          </div>
          <div className={s.buttons}>
            <button 
            className={s.button} 
            onClick={comprobarRol}>
              Ingresar
            </button>
          </div>
        </div>
            {accessSuccess && (
              <div className={s.success}>
                Fue ingresado correctamente
              </div>
            )}
            {accessError && (
              <div className={s.error}>
                No existe este tutor en nuestra base de datos
              </div>
            )}
      </section>
        </div>
      </div>
    </div>
                  
    )}
    {ModalR && (
      <div className={`overlay ${ModalR ? 'show' : 'hide'}`} onClick={changeModal}>
      <div className={`modal ${ModalR ? 'show' : 'hide'}`}>
        <div className='modal-content'>
          <h2>Información de reemplazo</h2>
          <p>ROL de quién se reemplaza</p>
          <div
            className={`editable-div ${editing ? 'editing' : ''}`}
            contentEditable="true"
            onClick={handleContentEditableClick}
        >
            {textoEditable}
        </div>
          <button className='close-modal' onClick={changeModal}>X</button>
        </div>
      </div>
    </div>
    )}
    </article>
    </>
  );
}

export default Admin;