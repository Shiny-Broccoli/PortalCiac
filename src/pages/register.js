// RegistrationForm.js
import React, { useEffect } from 'react';
import { registerRequest } from '../api/auth';
import { useForm } from 'react-hook-form';

import { useAuth } from '../contextUser/contextUser';

import{useNavigate} from 'react-router-dom';

const RegistrationForm = () => {
  // Estados para almacenar los valores del formulario

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signup, isAuthenticated, user, errors: RegisterErrors} = useAuth();
  const navigation = useNavigate();

  console.log(user)

  const onSubmit = handleSubmit( async (values) =>{
    signup(values);
  });

  useEffect(() =>{
    if (isAuthenticated)navigation("/");
  }, [isAuthenticated]);

  // Manejar el envío del formulario

  return (
    <div>
      {
        RegisterErrors.map((error, i) =>(
          <div className='bd-red-500 p-2' key={i}> {error}</div>       
            ))
      }
      <form onSubmit={onSubmit}>
      <label>
        Username:
        <input
          type="text"
          {...register("username", {required: true})}
        />
        {errors.username && (
          <p>
            Username is required
          </p>
        )}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          {...register("password", {required: true})}
        />
        {errors.email && (
          <p>
            email is required
          </p>
        )}
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          {...register("email", {required: true})}
        />
        {errors.password && (
          <p>
            password  is required
          </p>
        )}
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
    </div>
    
  );
};

export default RegistrationForm;
