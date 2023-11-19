import React from 'react';
import { Link } from 'react-router-dom';
import s from './Header.module.css';
import { useAuth } from '../../contextUser/contextUser';

function Header() {
  const {isAuthenticated, logout}= useAuth();
  return (
    <section className={s.header}>
      <img src="/Logo.svg" alt="Logo" className={s.logo}/>
      <div className={s.links}>
        <Link to="/">
          <button className={s.button}>Home</button>
        </Link>
        <Link to="/">
          <button className={s.button}>Ingresar turno</button>
        </Link>
        <Link to="/">
          <button className={s.button} onClick={logout}>Cerrar sesión</button>
        </Link>
      </div>
    </section>
  );
}

export default Header;