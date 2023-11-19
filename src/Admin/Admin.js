import React, { useState } from 'react';
import Header from "../components/Header/Header";
import InfoBloque from "../components/InfoBloque/InfoBloque";
import Turno from "../components/Turno/Turno";
import Wrapper from "../components/Wrapper/Wrapper";
import '../styles.css';
import axios from 'axios';
import {obtenerDatosDeAPI} from "../api/auth"

//const Arreglo = [{"nombre":"Christian Barrios", "estado": "En turno", "tipoTutor" : "Tutor/a de Mat/Fis"}, {"nombre":"Sofia Rios", "estado": "Ausente", "tipoTutor" : "Tutor/a de Mat/Fis"}];


function Admin() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [data] = useState([]);
  const [ id, setId ] = useState('');
  const [ rol, setRol ] = useState('');
  const [accessError, setAccessError] = useState(false);
  const [accessSuccess, setAccessSuccess] = useState(false);
  const [ inputError, setInputError ] = useState(false);
  const bloques = ['1-2','3-4','5-6','7-8','9-10','11-12'];
  const [bloqueActualIndex, setBloqueActualIndex] = useState(0);
  const [ModalR, setModal] = useState(false);
  //axios.get('http://localhost:9000/api/tutores') 

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
    setInputError(false);
    setModal(false);
    setMostrarModal(false);
    setAccessError(false);
    setAccessSuccess(false);
    setMostrarForm(false);
    setModal(false);
    setId('');
    setRol('');
    console.log(inputError);
  };

  //Comprueba que el ID exista en la base de datos de los tutores.
  const comprobarId = () => {
    console.log('ID ingresado:', id);

    const comprobacion = true;

    if (comprobacion && id !== ''){
      setAccessSuccess(true);
    }
    if (!comprobacion && id !== ''){
      setAccessError(true)
    } 
  };

  const inputErrorFunction = () => {
    let hasError = false;

    console.log("Aqui", inputError);
    console.log(id);
  
    if (rol === '') {
      hasError = true;
    }
  
    if (id === '') {
      hasError = true;
    }
  
    setInputError(hasError);

    console.log("MAs abajo", inputError);
  
    setTimeout(() => {
      setInputError(false);
    }, 500);
  };
  
  const cambiarBloque = (indice) => {
    const nuevoIndice = (bloqueActualIndex + indice + bloques.length) % bloques.length;
    setBloqueActualIndex(nuevoIndice);
  };

  //Comprueba que el rol exista en la base de datos de los tutores.
  const comprobarRol = () => {
    
    console.log('Rol ingresado:', rol);

    const comprobacion = true;

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
    <Wrapper>
      <h1>Turnos actuales</h1>
      <div className={s.box}>
        <div className={s.turnos}>
        {Arreglo.filter(item => item.bloque === bloques[bloqueActualIndex]).map((item) => (         
          <Turno
            key={item.nombre}
            name={item.nombre}
            tipoTutor={item.tipoTutor}
            state={
              item.Estado === 0 ? 'Ausente' :
              item.Estado === 1 ? 'En turno' :
              item.Estado === 2 ? 'Reemplazado' :
              'Estado desconocido'
            }
          />
        ))}
        {Arreglo.filter(item => item.bloque === bloques[bloqueActualIndex]).length === 0 && (
                <div className={s.noTutores}>
                  No hay tutores en este bloque 
                </div>
              )}
        </div>
        <div className={s.infoBloque}>
          <InfoBloque name="Axel Kaempffer">
            <div className={s.bloque}>
              <button className={s.icon}>
                  <img src="images/arrow-left.svg" alt="Flecha hacia la izquierda" onClick={() => cambiarBloque(-1)}/>
              </button>
              <span className={s.bloqueName}>{bloques[bloqueActualIndex]}</span>
              <button className={s.icon}>
                  <img src="images/arrow-right.svg" alt="Flecha hacia la izquierda" onClick={() => cambiarBloque(1)}/>
              </button>
            </div>
          </InfoBloque>
          <button className={s.button3} onClick={abrirModal}>Ingresar turno</button>
          <button className={s.button3} onClick={changeModal}>Ingresar reemplazo</button>
        </div>
      </div>
      <div>
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
            <text className={s.subtitle}>Lee el código QR del tutor/a</text>
            <div className={s.codigoQR}>
              <img src="images/codigoQR.png" alt="Imagen de un código QR" className={s.image}/>
              <input type="text" name="id" value={id} onChange={recuperarId} className={`${inputError ? s.inputError : s.input}`}/>
            </div>
            <div className={s.buttons}>
              <button className={s.button} onClick={() => { inputErrorFunction(); comprobarId(); }}>Ingresar</button>
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
          <button onClick={cerrarModal} className={s.icon}>
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
            onClick={() => { comprobarRol(); inputErrorFunction(); }}>
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
      <div className={`overlay ${ModalR ? 'show' : 'hide'}`}>
      <div className={`modal ${ModalR ? 'show' : 'hide'}`}>
      <div className='modal-content'>
            <section className={s.form}>
              <div className={s.title}>
          <h2>Ingresar reemplazo</h2>
          <button onClick={cerrarModal} className={s.icon}>
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
            onClick={() => { comprobarRol(); inputErrorFunction(); }}>
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
    </Wrapper>
    </>
  );
}

export default Admin;