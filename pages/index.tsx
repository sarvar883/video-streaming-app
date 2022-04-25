import React, { FC, useState, useEffect, } from 'react';
import { useRouter } from 'next/router';

import { useTypedSelector } from '@/utils/useTypedSelector';
import { useActions } from '@/utils/useActions';

// import interfaces
import { IVideo } from '@/ts_interfaces/video';


const index: FC = () => {
  const router = useRouter();

  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const { getVideosList, setVideoToWatch } = useActions();
  const videoReducer = useTypedSelector((state) => state.video);

  useEffect(() => {
    if (videoReducer.videos && videoReducer.videos.length > 0) {
      setVideos(videoReducer.videos);
    } else {
      setLoading(true);
      getVideosList();
    }
  }, []);

  useEffect(() => {
    setVideos(videoReducer.videos);
    setLoading(videoReducer.loading);
  }, [videoReducer]);

  const goToVideoPage = (video: IVideo) => {
    setVideoToWatch(video);

    // redirect to the video page
    router.push(`/video/${video.id}`);
  };

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <h2 className='text-center'>Welcome! Enjoy Videos</h2>
        </div>
      </div>

      <div className="row">
        {videos.map((video, index) => (
          <div key={index} className='col-lg-4 col-md-6 mt-3'>
            <div className="card">
              <div className="card-header text-center">{video.title}</div>

              <div className="card-body">
                <h5>Author: {video.author}</h5>
                <h5>Length: {video.length}</h5>
              </div>

              <div className="card-footer">
                <button
                  className='btn btn-primary btn-block'
                  onClick={() => goToVideoPage(video)}
                >Watch</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;