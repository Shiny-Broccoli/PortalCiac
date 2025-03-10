import React, { useState , useEffect} from 'react';
import Header from "../components/Header/Header";
import InfoBloque from "../components/InfoBloque/InfoBloque";
import Turno from "../components/Turno/Turno";
import Wrapper from "../components/Wrapper/Wrapper";
import '../styles.css';
import s from './Admin.module.css';
import axios from 'axios';
import {obtenerDatosDeAPI} from "../api/auth";
import {updateState} from "../api/tutorQuerys";


function Admin() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [data, setData] = useState({tutors:[]});
  const [ id, setId ] = useState('');
  const [ rut1, setRut1 ] = useState('');
  const [ rut2, setRut2 ] = useState('');
  const [accessError, setAccessError] = useState(false);
  const [accessSuccess, setAccessSuccess] = useState(false);
  const [ inputError, setInputError ] = useState(false);
  const bloques = ['1-2','3-4','5-6','7-8','9-10','11-12'];
  const [bloqueActualIndex, setBloqueActualIndex] = useState(0);
  const [ModalR, setModal] = useState(false);


  const Arreglo = [
    {"nombre":"Christian Barrios", "Estado": 0, "tipoTutor" : "Tutor/a de Mat/Fis", "bloque": "3-4"}, 
    {"nombre":"Sofia Rios", "Estado": 1, "tipoTutor" : "Tutor/a de Química", "bloque": "3-4"},
    {"nombre":"Vicente Luongo", "Estado": 2, "tipoTutor" : "Tutor/a de Mat/Fis", "bloque": "5-6"},
    {"nombre":"Gabriel Venegas", "Estado": "Ausente", "tipoTutor" : "Tutor/a de Mat/Fis", "bloque": "7-8"},
  ];
  const changeModal = () => {
    setModal(!ModalR);
  };

  //Abre el modal para ingresar turno manual
  const changeForm = () => {
    setMostrarModal(false);
    setMostrarForm(!mostrarForm);
    setAccessError(false);
    setAccessSuccess(false);
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
    setRut2('');
    setRut1('');
    console.log(inputError);
  };

  //Comprueba que el ID exista en la base de datos de los tutores.
  const comprobarId = () => {
    console.log('ID ingresado:', id, data);
    var persona = data.tutors.filter((elem) =>elem.RUT === id);
    persona = persona.length === 0 ? {RUT: null, oldState: -1} : persona[0];
    const {Estado: oldState, RUT: rut, name: name} = persona;    
    console.log("persona es:",persona);

    const comprobacion = rut === null ? false : true;
    console.log("encontrado?: ",comprobacion);
    if (comprobacion){
      setAccessSuccess(true);
      if (oldState === 0){
        updateState(1,rut);
      }
      if (oldState === 1){
        updateState(0,rut);
      }
    }
    if (!comprobacion && id !== ''){
      setAccessError(true)
    }

  };

  const inputErrorFunction = () => {
    let hasError = false;

    console.log("Aqui", inputError);
    console.log(id);

    if (rut1 === '' && id === '') {
      console.log("Entro aqui");
      hasError = true;
    }
  
    setInputError(hasError);

    console.log("Mas abajo", inputError);
  
    setTimeout(() => {
      setInputError(false);
    }, 500);
  };
  
  const cambiarBloque = (indice) => {
    const nuevoIndice = (bloqueActualIndex + indice + bloques.length) % bloques.length;
    setBloqueActualIndex(nuevoIndice);
  };

  //Comprueba que el rol exista en la base de datos de los tutores.
  const comprobarReemplazo = () => {
    console.log('Rut reemplazado:', rut1);
    console.log("Rut reemplazante:",rut2);
    //busca reemplazado
    var persona = data.tutors.filter((elem) =>elem.RUT === rut1);
    persona = persona.length === 0 ? {RUT: null, oldState: -1,name: "no existo:C"} : persona[0];
    const {Estado: oldStateI, RUT: rutI, name: nameI} = persona;
    console.log("nombre del reemplazado:",nameI);
    //tutor reemplazado listo
    //busca reemplazante
    var persona2 = {};
    //reemplazante encontrado
    const comprobacion = true;
    if (comprobacion && rut1 !== ''){
      setAccessSuccess(true);
    }

    if(!comprobacion && rut1 !== ''){
      setAccessError(true)
    } 

  };

  //Recupera el ID del input
  const recuperarId = (event) => {
    setId(event.target.value);
  };

  //Recupera el rol del input
  const recuperarRut = (event) => {
    setRut1(event.target.value);

  };
  const recuperarRut2 = (event) => {
    setRut2(event.target.value);

  };
  useEffect(() => {
    // Realiza una solicitud GET a la API
    //esta consulta debe mostrar los tutores del turno actual + tutores que estén en reemplazo o en turno.
    obtenerDatosDeAPI(bloques[bloqueActualIndex], setData);
  }, [accessSuccess, bloqueActualIndex]);

  return(
    <>
    <Header/>
    <Wrapper>
      <h1>Turnos actuales</h1>
      <div className={s.box}>
        <div className={s.turnos}>
        {data.tutors.map((item) => (         
          <Turno
            key={item._id}
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
        {data.tutors.length === 0 && (
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
            <label>Rut:</label>
            <input type="text" name="rut1" value={rut1} onChange={recuperarRut} className={`${inputError ? s.inputError : s.input}`}/>
          </div>
          <div className={s.buttons}>
            <button 
            className={s.button} 
            onClick={() => { comprobarReemplazo(); inputErrorFunction(); }}>
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
            <label>Rut del reemplazado:</label>
            <input type="text" name="rut1" value={rut1} onChange={recuperarRut} className={`${inputError ? s.inputError : s.input}`}/>
          </div>
          <div className={s.label}>
            <label>Rut del que reemplaza:</label>
            <input type="text" name="rut2" value={rut2} onChange={recuperarRut2} className={`${inputError ? s.inputError : s.input}`}/>
          </div>
          <div className={s.buttons}>
            <button 
            className={s.button} 
            onClick={() => { comprobarReemplazo(); inputErrorFunction(); }}>
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