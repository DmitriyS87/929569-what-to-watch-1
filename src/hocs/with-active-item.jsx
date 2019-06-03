import React from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component, initialState) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.active || initialState || null
      };
    }

    render() {
      const {activeItem} = this.state;
      return <Component {...this.props} activeItem={activeItem} setActive={(item) => (this.setState({activeItem: item}))} />;
    }
  }

  WithActiveItem.propTypes = {
    active: PropTypes.string,
  };

  return WithActiveItem;
};

export default withActiveItem;
