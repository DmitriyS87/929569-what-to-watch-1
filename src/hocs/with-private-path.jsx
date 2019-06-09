import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

export const withPrivatePath = (Component) => {
  class WithPrivatePath extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {user} = this.props;
      switch (user) {
        case null:
          return (<Redirect to="/login" />);
        default:
          return (<Component {...this.props} />);
      }
    }
  }

  WithPrivatePath.propTypes = {
    user: PropTypes.object,
  };

  return WithPrivatePath;
};

export default withPrivatePath;
