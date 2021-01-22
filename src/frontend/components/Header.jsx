import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';
import '../assets/styles/components/Header.scss';
import logo from '../assets/img/logo-platzi-video-BW2.png';
import userIcon from '../assets/img/user-icon.png';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    props.logoutRequest({});
    window.location.href = '/login';
  };

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  return (
    <header className={headerClass}>
      <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video" />
      </Link>
      <div className="header__menu">
        <div className="header__menu--profile">
          <img
            src={hasUser ? gravatar(user.email) : userIcon}
            alt={hasUser ? user.email : 'User icon'}
          />
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser && (
            <li>
              <a href="/">{user.name}</a>
            </li>
          )}
          {hasUser ? (
            <li>
              <a href="#logout" onClick={handleLogout}>
                Cerrar Sesión
              </a>
            </li>
          ) : (
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  logoutRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
