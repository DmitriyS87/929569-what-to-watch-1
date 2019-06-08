import React from 'react';
import PropTypes from 'prop-types';

const UserBlock = (props) => {
  const {loginUser, user} = props;

  if (!user) {
    return (
      <div className="user-block">
        <a onClick={loginUser} href="#" className="user-block__link">Sign in</a>
      </div>);
  }

  return (
    <div className="user-block">
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </div>
  );
};

UserBlock.propTypes = {
  user: PropTypes.object,
  loginUser: PropTypes.func.isRequired,
};

export default UserBlock;
