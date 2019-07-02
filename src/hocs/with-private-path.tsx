import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user/selectors';

const withPrivatePath = <P extends Object>(Component: React.ComponentType<P>) => {
  interface Props {
    user: {} & null;
  }

  class WithPrivatePath extends React.Component<P & Props> {
    constructor(props) {
      super(props);
    }

    render() {
      const { user } = this.props;

      if (user) {
        return <Component {...this.props} />;
      }

      return <Redirect to='/login' />;
    }
  }

  return WithPrivatePath;
};

const mapStateToProps = state => {
  return {
    user: getUser(state),
  };
};

export default compose(
  connect(mapStateToProps),
  withPrivatePath
);
export { withPrivatePath };
