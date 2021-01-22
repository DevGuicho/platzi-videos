import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';
import googleIcon from '../assets/img/google-icon.png';
import twitterIcon from '../assets/img/twitter-icon.png';
import '../assets/styles/components/Login.scss';
import Header from '../components/Header';

const Login = (props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginRequest(form);
    props.history.push('/');
  };
  return (
    <>
      <Header isLogin />
      <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              className="login__input"
              name="email"
              type="text"
              placeholder="Correo"
              onChange={handleChange}
            />
            <input
              className="login__input"
              name="password"
              type="password"
              placeholder="Contraseña"
              onChange={handleChange}
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
    </>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
