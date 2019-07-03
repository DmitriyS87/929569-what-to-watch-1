import * as React from 'react';

export interface withFormValidationSignInProps {
  active: string;
}
export interface withFormValidationSignInState {
  passwordError: boolean;
  emailError: boolean;
}

const withFormValidationSignIn = (Component: React.ComponentType<any>) => {
  class WithFormValidationSignIn extends React.Component<any, withFormValidationSignInState> {
    constructor(props) {
      super(props);

      this.state = {
        passwordError: false,
        emailError: false,
      };

      this.checkEmailValidity = this.checkEmailValidity.bind(this);
      this.checkPassportValidity = this.checkPassportValidity.bind(this);
    }

    checkEmailValidity(currentValue) {
      const patternRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!patternRegExp.test(currentValue)) {
        this.setState({
          emailError: true,
        });

        return false;
      }

      this.setState({
        emailError: false,
      });
      return true;
    }

    checkPassportValidity(currentValue) {
      if (!currentValue) {
        this.setState({
          passwordError: true,
        });

        return false;
      }
      this.setState({
        passwordError: false,
      });

      return true;
    }

    render() {
      const { emailError, passwordError } = this.state;

      return (
        <Component
          {...this.props}
          checkEmailValidation={this.checkEmailValidity}
          checkPasswordValidation={this.checkPassportValidity}
          emailError={emailError}
          passwordError={passwordError}
        />
      );
    }
  }

  return WithFormValidationSignIn;
};

export default withFormValidationSignIn;
