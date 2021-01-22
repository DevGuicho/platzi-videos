import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions';
import '../assets/styles/components/Register.scss';
import Header from '../components/Header';

const Register = (props) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.registerUser(form, '/login');
  };
  return (
    <>
      <Header isRegister />
      <section className="register">
        <section className="register__container">
          <h2>Regístrate</h2>
          <form className="register__container--form" onSubmit={handleSubmit}>
            <input
              className="login__input"
              type="text"
              name="name"
              placeholder="Nombre"
              onChange={handleInput}
            />
            <input
              className="login__input"
              type="text"
              name="email"
              placeholder="Correo"
              onChange={handleInput}
            />
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleInput}
            />
            <button className="button" type="submit">
              Registrarme
            </button>
          </form>
          <Link to="/login">Iniciar sesión</Link>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);
