import * as React from 'react';
import { createRef } from 'react';
import MessageRows from '../message/message';
import { withRouter } from 'react-router-dom';
import Footer from '../footer/footer';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import withFormValidationSignIn from '../../hocs/with-form-validation-sign-in';
import { Operation } from '../../reducers/user/user.js';
import { getLoginStatus, getUserStatus } from '../../reducers/user/selectors.js';

const MESSAGE_CLASS = `sign-in__message`;

interface Props {
  onLogin: ({ email, password: string }) => void;
  message: string;
  history: any;
  user: any;
  isLogged: boolean;
  emailError: boolean;
  passwordError: boolean;
  isAuthorizationFailed: boolean;
  checkEmailValidation: (string) => boolean;
  checkPasswordValidation: (string) => boolean;
}

class SignIn extends React.PureComponent<Props, null> {
  private emailRef = createRef<HTMLInputElement>();
  private passwordRef = createRef<HTMLInputElement>();
  private from: string;

  constructor(props) {
    super(props);
    this.from = props.history.location.state ? history.location.state.from.pathname : '/';
    this.handelSubmit = this.handelSubmit.bind(this);
    this.makeMessage = this.makeMessage.bind(this);
  }

  componentDidUpdate() {
    const { isLogged, history } = this.props;

    if (isLogged) {
      console.log();
      history.push(this.from);
    }
  }

  render() {
    const { emailError, passwordError } = this.props;
    const emailFieldClasses = emailError
      ? `sign-in__field sign-in__field--error`
      : `sign-in__field`;
    const passwordFieldClasses = passwordError
      ? `sign-in__field sign-in__field--error`
      : `sign-in__field`;
    const messageText = this.makeMessage();

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
          <form action='#' className='sign-in__form' onSubmit={this.handelSubmit}>
            <MessageRows text={messageText} style={MESSAGE_CLASS} />
            <div className='sign-in__fields'>
              <div className={emailFieldClasses}>
                <input
                  autoComplete='on'
                  ref={this.emailRef}
                  className='sign-in__input'
                  type='email'
                  placeholder='Email address'
                  name='user-email'
                  id='user-email'
                />
                <label className='sign-in__label visually-hidden' htmlFor='user-email'>
                  Email address
                </label>
              </div>
              <div className={passwordFieldClasses}>
                <input
                  autoComplete='off'
                  className='sign-in__input'
                  type='password'
                  placeholder='Password'
                  name='user-password'
                  id='user-password'
                  ref={this.passwordRef}
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
  }

  handelSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const { onLogin, checkEmailValidation, checkPasswordValidation } = this.props;
    // @ts-ignore
    const isValideEmail = checkEmailValidation(this.emailRef.current.value);
    // @ts-ignore
    const isValidPassword = checkPasswordValidation(this.passwordRef.current.value);
    if (isValidPassword && isValideEmail) {
      const user = evt.target.elements;
      onLogin({
        email: user[`user-email`].value,
        password: user[`user-password`].value,
      });
    }
  }

  makeMessage() {
    const { emailError, passwordError, isAuthorizationFailed } = this.props;
    let message = ``;
    if (emailError || passwordError || isAuthorizationFailed) {
      if (emailError && passwordError) {
        message = `Please type informations in both fields`;
      } else if (emailError) {
        message = `Field email error. Some mistakes here?`;
      } else if (passwordError) {
        message = `You should set a password field to have access`;
      }
      if (isAuthorizationFailed) {
        message = `We can’t recognize this email and password combination. Please try again.`;
      }
    }
    return message;
  }
}

const mapStateToProps = state => ({
  isAuthorizationFailed: getLoginStatus(state),
  isLogged: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  onLogin: user => dispatch(Operation.tryLogin(user)),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFormValidationSignIn,
  withRouter
);

export default enhance(SignIn);
export { SignIn };
