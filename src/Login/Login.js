import React, { useEffect, useState } from 'react';
import testUser from '../testUser';
import frame_2 from '../images/Frame_2.png';
import ciacpng from '../images/Ciac.png';  
import {useParams, useNavigate, Navigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import { useAuth } from '../contextUser/contextUser';


function Login({ role }) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [loggedIN, setLoggedIN] = useState(false);
  const navigate = useNavigate();

  const URLvariable = window.location.href;
  const parts = URLvariable.split('/');
  const lastSegment = parts.pop() || parts.pop();
  const lastSegmentMayus = lastSegment.split(/(?=[A-Z])/)
  const Role = lastSegmentMayus[0];


  const {register, handleSubmit, formState:{errors}} = useForm();
  const {login, errors:loginErrors, isAuthenticated}= useAuth();

    
  const onSubmit = handleSubmit((data) =>{
    login(data);
  })

  useEffect(() => {
    if(isAuthenticated){
      switch (Role) {

        case 'Admin':
          navigate('/Admin'); // redirect a Admin
          break;
        case 'Tutor':
          navigate('/vista-tutor'); // 
          break;
        case 'Coordinador':
          navigate('/Coordinador'); // 
          break;
        default:
          console.log('Invalid role');
      }
    }
  }, [isAuthenticated])



  // implemenar logica real, no este meme
  // if (username === testUser.username && password === testUser.password) {
  //   console.log(`Logged in as ${role} with username: ${username}`);

  //   // redirigir a las paginas correspondientes
  //   switch (Role) {

  //     case 'Admin':
  //       navigate('/Admin'); // redirect a Admin
  //       break;
  //     case 'Tutor':
  //       navigate('/vista-tutor'); // 
  //       break;
  //     case 'Coordinador':
  //       navigate('/Coordinador'); // 
  //       break;
  //     default:
  //       console.log('Invalid role');
  //   }
  // } else {
  //   console.log('Invalid credentials');
  // }


  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleLogin = (e) => {
  //   e.preventDefault(); // previene el refresh de la pagina

  //   // implementar login real
  //   if (username === testUser.username && password === testUser.password) {
  //     console.log(`Logged in as ${role} with username: ${username}`);

  //     // realizar autenficicacion real con el servidor
  //     //history.push('/'); // redireccionar a la pagina principal apropiada
  //   } else {
  //     console.log('Invalid credentials');
  //     // hay que manejar credenciales invalidas
  //   }
  // };

  const background = {
    backgroundImage: `url(${frame_2})`,
    backgroundSize: '100% 100%',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const ButtonStyle = {
    background: '#2F2D38',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '81px',
    paddingRight: '81px',
    borderRadius: '10px',
    cursor: 'pointer',
    color: 'white',
  };

  const smallerTextStyle = {
    fontSize: '14px', 
    textAlign: 'center',
  };

  const loginConstentStyle = {
    background: 'white',
    paddingTop: '50px',
    paddingBottom: '50px',
    paddingLeft: '100px',
    paddingRight: '100px',
    borderRadius: '25px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    textalign: 'center',
    linkStyle: 'center'
  };

  const inputStyle = {
    width: '200px', 
    height: '40px', 
    border: '1px solid #8A8A8A',
    borderRadius: '10px',
    paddingLeft: '10px', 
    fontSize: '16px',
  };

  const CiacStyle = {
    position: 'absolute',
    top: '10px',
    left: '25px',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
  };
  
  const alignCenter = {
    textAlign: 'center',
  };


  return (
    <div className="login-page" style={background}>
      <div className="login" style={loginConstentStyle}>
        <a href="/" alt="Image Button" style={CiacStyle}> {/*agregar link del logo*/}
          <img src={ciacpng} alt="Image Button" style={CiacStyle} />
        </a>
        <h2 style={alignCenter}>Iniciar sesión</h2>
        <p style={smallerTextStyle}>{Role}</p>
        {
        loginErrors.map((error, i) =>(
          <div className='bd-red-500 p-2' key={i}> {error}</div>       
            ))
        }
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <br />
            <input
              type="text"
              id="username"
              {...register("email", {required:true})}
              placeholder="Ingresa tu usuario..." 
              style={inputStyle} 
            />
            {errors.email && (
              <p className='text-red-500'> email requerido</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              {...register("password", {required:true})}
              placeholder='Ingresa tu contraseña...'
              style={inputStyle}
            />
            {errors.password && (
              <p className='text-red-500'> contraseña requerida</p>
            )}
          </div>
          <br />
          <button style={ButtonStyle} type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
