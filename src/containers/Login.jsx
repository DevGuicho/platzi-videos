import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/img/google-icon.png';
import twitterIcon from '../assets/img/twitter-icon.png';
import '../assets/styles/components/Login.scss';

const Login = () => {
  return (
    <section className="login">
      <section className="login__container">
        <h2>Inicia sesión</h2>
        <form className="login__container--form">
          <input className="login__input" type="text" placeholder="Correo" />
          <input
            className="login__input"
            type="password"
            placeholder="Contraseña"
          />
          <button className="button" type="submit">
            Iniciar sesión
          </button>
          <div className="login__container--remember-me">
            <label htmlFor="cbox1">
              <input
                type="checkbox"
                name="cbox1"
                id="cbox1"
                value="first_checkbox"
              />
              Recuérdame
            </label>
            <Link to="/">Olvidé mi contraseña</Link>
          </div>
        </form>
        <section className="login__container--social-media">
          <div>
            <img src={googleIcon} alt="" />
            Inicia sesión con Google
          </div>
          <div>
            <img src={twitterIcon} alt="" />
            Inicia sesión con Twitter
          </div>
        </section>
        <p className="login__container--register">
          No tienes ninguna cuenta
          <Link to="register"> Regístrate</Link>
        </p>
      </section>
    </section>
  );
};

export default Login;
