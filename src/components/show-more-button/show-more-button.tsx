import * as React from 'react';

const MAIN_PAGE_VIDEO_SHOW_LIMIT = 20;

const ShowMoreButton = props => {
  const { movies, limit, setNewShowLimit } = props;
  const isShowedAll = (length: number, limit: number) => {
    return length > limit ? false : true;
  };

  if (isShowedAll(movies.length, limit)) {
    return <div />;
  }

  const handlerClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setNewShowLimit(MAIN_PAGE_VIDEO_SHOW_LIMIT);
  };

  return (
    <div className='catalog__more'>
      <button onClick={handlerClick} className='catalog__button' type='button'>
        Show more
      </button>
    </div>
  );
};

export default ShowMoreButton;
