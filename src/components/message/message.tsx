import * as React from 'react';

interface Props {
  text: string,
  style: string,
}

const MessageRows = (props: Props): any => {
  const { text, style } = props;
  if (text.length === 0) {
    return <div />;
  }

  return (
    <div className={style}>
      <p>
        {text}
      </p>
    </div>
  );
};

export default MessageRows;
