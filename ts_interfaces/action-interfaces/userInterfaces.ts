import { ActionType } from '@/utils/actionTypes';
import { IVideo } from '@/ts_interfaces/video';
import { IError } from '@/ts_interfaces/reduxError';


interface GetVideosListLoadingAction {
  type: ActionType.GET_VIDEOS_LIST_LOADING;
};

interface GetVideosListSuccessAction {
  type: ActionType.GET_VIDEOS_LIST;
  payload: IVideo[];
};

interface GetVideosListErrorAction {
  type: ActionType.GET_VIDEOS_LIST_ERROR;
  payload: IError;
};

interface SetVideoToWatch {
  type: ActionType.SET_VIDEO_TO_WATCH,
  payload: IVideo,
};

export type VideoAction =
  | GetVideosListLoadingAction
  | GetVideosListSuccessAction
  | GetVideosListErrorAction
  | SetVideoToWatch;