import * as React from 'react';
import { withRouter } from 'react-router-dom';

interface Props {
  user: {} | null,
  history: { push: (param: string) => void },
}

const UserBlock = (props: Props) => {
  const { user, history } = props;

  const handleClick = (evt) => {
    evt.preventDefault();
    history.push(`favorites`);
  };

  if (!user) {
    return (
      <div className="user-block">
        <a onClick={handleClick} href="" className="user-block__link">Sign in</a>
      </div>);
  }

  return (
    <div className="user-block">
      <div className="user-block__avatar">
        <img onClick={handleClick} src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </div>
  );
};

export default withRouter(UserBlock);
export { UserBlock };
