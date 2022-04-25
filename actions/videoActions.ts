import axios from 'axios';

import { Dispatch } from 'redux';
import { ActionType } from '@/utils/actionTypes';
import { VideoAction } from '@/ts_interfaces/action-interfaces/userInterfaces';


export const getVideosList = () => async (dispatch: Dispatch<VideoAction>) => {
  try {
    const { data } = await axios.post('/api/video/all');

    dispatch({ type: ActionType.GET_VIDEOS_LIST, payload: data.data });

  } catch (error) {
    console.log('getVideosList error', error.response);
    const errorObject = {
      name: error.response.statusText as string,
      message: error.response.data.message as string,
    };

    dispatch({ type: ActionType.GET_VIDEOS_LIST_ERROR, payload: errorObject });
  }
};


export const setVideoToWatch = (video) => async (dispatch: Dispatch<VideoAction>) => {
  dispatch({ type: ActionType.SET_VIDEO_TO_WATCH, payload: video, });
};


export const getVideoData = (id: string) => async (dispatch: Dispatch<VideoAction>) => {
  try {
    const { data } = await axios.get(`/api/video/${id}`);

    dispatch({ type: ActionType.SET_VIDEO_TO_WATCH, payload: data.data });

  } catch (error) {
    console.log('getVideoData error', error.response);
    const errorObject = {
      name: error.response.statusText as string,
      message: error.response.data.message as string,
    };

    dispatch({ type: ActionType.GET_VIDEOS_LIST_ERROR, payload: errorObject });
  }
};