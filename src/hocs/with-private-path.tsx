import * as React from 'react';
import { Redirect } from 'react-router-dom';

export const withPrivatePath = <P extends Object>(Component: React.ComponentType<P>) => {
  interface Props {
    user: {} & null
  }

  class WithPrivatePath extends React.Component<P & Props> {
    constructor(props) {
      super(props);
    }

    render() {
      const { user } = this.props;
      switch (user) {
        case null:
          return (<Redirect to="/login" />);
        default:
          return (<Component {...this.props} />);
      }
    }
  }

  return WithPrivatePath;
};

export default withPrivatePath;
