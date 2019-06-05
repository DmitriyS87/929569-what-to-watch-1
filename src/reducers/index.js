import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as genre} from './genre/genre';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.GENRE]: genre,
});
