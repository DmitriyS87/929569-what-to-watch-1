import React from 'react';
import PropTypes from 'prop-types';

const MessageRows = (props) => {
  const {text, style} = props;
  if (text.length === 0) {
    return ``;
  }

  return (
    <div className={style}>
      <p>
        {text}
      </p>
    </div>
  );
};

MessageRows.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
};

export default MessageRows;
