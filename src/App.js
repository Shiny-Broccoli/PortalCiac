import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './Admin/Admin';
import AdminLoginPage from './Login/AdminLoginPage';
import Coordinador from './Coordinador/Coordinador';
import CoordinadorLoginPage from './Login/CoordinadorLoginPage';
import Horario from './Horario';
import Login from './Login/Login';
import RoleSelectionPage from './Login/RoleSelectionPage';
import TutorLoginPage from './Login/TutorLoginPage';

import VentanaDeAusencias from "./pages/VentanaDeAusencias";
import VentanaDeHoras from "./pages/VentanaDeHoras";
import VentanaDeReemplazos from "./pages/VentanaDeReemplazos";
import VentanaTurnos from "./pages/VentanaTurnos";
import VistaTutor from "./pages/VistaTutor";

import RegistrationForm from './pages/register';
import {AuthProvider} from './contextUser/contextUser';
import ProtectedRoute from './ProtectedRoute';


function App() {
  // const action = useNavigationType();
  // const location = useLocation();
  // const pathname = location.pathname;

  // useEffect(() => {
  //   if (action !== "POP") {
  //     window.scrollTo(0, 0);
  //   }
  // }, [action, pathname]);

  // useEffect(() => {
  //   let title = "";
  //   let metaDescription = "";

  //   switch (pathname) {
  //     case "/":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/ventana-de-ausencias":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/ventana-de-horas":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/ventana-de-reemplazos":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/vista-tutor":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //   }

  //   if (title) {
  //     document.title = title;
  //   }

  //   if (metaDescription) {
  //     const metaDescriptionTag = document.querySelector(
  //       'head > meta[name="description"]'
  //     );
  //     if (metaDescriptionTag) {
  //       metaDescriptionTag.content = metaDescription;
  //     }
  //   }
  // }, [pathname]);
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/yourRoute/:URLvariable" element={<Login />} />
            <Route path="/" element={<RoleSelectionPage />} />
            <Route path="/AdminLoginPage" element={<AdminLoginPage/>} />
            <Route path="/TutorLoginPage" element={<TutorLoginPage />} />
            <Route path="/CoordinadorLoginPage" element={<CoordinadorLoginPage />} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Horario" element={<Horario />} />
              <Route path="/Coordinador" element={<Coordinador />} />
              <Route path="/ventana-turnos" element={<VentanaTurnos />} />
              <Route path="/ventana-de-ausencias" element={<VentanaDeAusencias />} />
              <Route path="/ventana-de-horas" element={<VentanaDeHoras />} />
              <Route path="/ventana-de-reemplazos" element={<VentanaDeReemplazos />} />
              <Route path="/vista-tutor" element={<VistaTutor />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;