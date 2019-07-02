import * as React from 'react';
import MessageRows from '../message/message';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Footer from '../footer/footer';
interface Props {
  onLogin: ({ email, password: string }) => void;
  message: string;
  history: any;
  user: any;
}

const SignIn = (props: Props) => {
  const { message, history, user } = props;
  const from = history.location.state ? history.location.state.from.pathname : '/';

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

  if (user) {
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
      <Footer />
    </div>
  );
};

export default withRouter(SignIn);
export { SignIn };
