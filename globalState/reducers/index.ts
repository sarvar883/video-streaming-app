import { combineReducers } from 'redux';

// import reducers
import videoReducer from './videoReducer';

const reducers = combineReducers({
  video: videoReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;