import * as React from 'react';
import MessageRows from '../message/message';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
interface Props {
  onLogin: ({ email, password: string }) => void;
  message: string;
  history: any;
  isAuthorizationRequired: boolean;
}

const SignIn = (props: Props) => {
  const { message, isAuthorizationRequired, history } = props;
  const from = history.location.state.from.pathname || '/';

  const handleSubmit = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    const { onLogin } = props;
    const user = evt.target.elements;
    onLogin({
      email: user[`user-email`].value,
      password: user[`user-password`].value,
    });
  };

  if (!isAuthorizationRequired) {
    return <Redirect to={from} />;
  }
  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <div className='logo'>
          <a href='#' className='logo__link'>
            <span className='logo__letter logo__letter--1'>W</span>
            <span className='logo__letter logo__letter--2'>T</span>
            <span className='logo__letter logo__letter--3'>W</span>
          </a>
        </div>

        <h1 className='page-title user-page__title'>Sign in</h1>
      </header>

      <div className='sign-in user-page__content'>
        <form action='#' className='sign-in__form' onSubmit={handleSubmit}>
          <MessageRows text={message} style={`sign-in__message`} />
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                autoComplete='on'
              />
              <label className='sign-in__label visually-hidden' htmlFor='user-email'>
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                autoComplete='off'
              />
              <label className='sign-in__label visually-hidden' htmlFor='user-password'>
                Password
              </label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn' type='submit'>
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className='page-footer'>
        <div className='logo'>
          <a href='#' className='logo__link logo__link--light'>
            <span className='logo__letter logo__letter--1'>W</span>
            <span className='logo__letter logo__letter--2'>T</span>
            <span className='logo__letter logo__letter--3'>W</span>
          </a>
        </div>

        <div className='copyright'>
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default withRouter(SignIn);
export { SignIn };
