import React from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem
      };
    }

    render() {
      const {activeItem} = this.state;
      return <Component {...this.props} activeItem={activeItem} onClick={(item) => (this.setState({activeItem: activeItem === item ? item : ``}))} />;
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
