import { ActionType } from '@/utils/actionTypes';

import { VideoAction } from '@/ts_interfaces/action-interfaces/userInterfaces'
import { IVideo } from '@/ts_interfaces/video';
import { IError } from '@/ts_interfaces/reduxError';

interface VideosState {
  loading: boolean;
  error: IError | null;
  videos: IVideo[];
  toWatch: IVideo | null;
};

const initialState = {
  loading: false,
  error: null,
  videos: [],
  toWatch: null,
};

const reducer = (state: VideosState = initialState, action: VideoAction) => {
  switch (action.type) {
    case ActionType.GET_VIDEOS_LIST:
      return {
        ...state,
        loading: false,
        error: null,
        videos: action.payload
      };

    case ActionType.SET_VIDEO_TO_WATCH:
      return {
        ...state,
        toWatch: action.payload,
      }

    case ActionType.GET_VIDEOS_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default: return state;
  }
};

export default reducer;