import React from 'react';
import PropTypes from 'prop-types';
import MessageRows from '../message/message.jsx';

const SignIn = (props) => {
  const {onLogin, message} = props;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const user = evt.target.elements;
    onLogin({
      email: user[`user-email`].value,
      password: user[`user-password`].value
    });
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="#" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>

      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <MessageRows text={message} style={`sign-in__message`} />
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="#" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div >
  );
};

SignIn.propTypes = {
  onLogin: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default SignIn;
