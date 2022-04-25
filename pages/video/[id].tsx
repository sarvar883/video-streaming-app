import React, { FC, useState, useEffect, } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useTypedSelector } from '@/utils/useTypedSelector';
import { useActions } from '@/utils/useActions';

// import interfaces
import { IVideo } from '@/ts_interfaces/video';


const video: FC = () => {
  const router = useRouter();

  // metadata of the video
  const [videoId, setVideoId] = useState<String>('');
  const [videoData, setVideoData] = useState<IVideo | null>(null);

  const { getVideoData } = useActions();

  const videoReducer = useTypedSelector((state) => state.video);

  useEffect(() => {
    if (!router.isReady) return;

    let videoIdInQuery = router.query.id as string;

    setVideoId(videoIdInQuery);

    if (videoReducer.toWatch) {
      setVideoData(videoReducer.toWatch);
    } else {
      getVideoData(videoIdInQuery);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (videoReducer.toWatch) {
      setVideoData(videoReducer.toWatch);
    }
  }, [videoReducer]);

  if (videoReducer.error) {
    return (
      <div className='container'>
        <div className="row">
          <div className="mt-4 p-5 bg-primary text-white rounded">
            <h2>{videoReducer.error.message}</h2>
          </div>
        </div>
      </div>
    )
  }

  if (videoReducer.loading) {
    return (
      <>Waiting...</>
    );
  }

  if (!videoData) {
    return <></>;
  }

  return (
    <div className='container mt-3'>
      <div className="row">
        <div className='col-md-9 mt-3 m-auto'>
          <div className="card">
            <div className="card-header text-center">
              <h4 className="text-center">{videoData.title}</h4>
            </div>

            <div className="card-body">
              <video width='100%' height='100%' controls autoPlay>
                <source src={`/api/video/stream-video/${videoId}`} type="video/mp4" />
              </video>
            </div>

            <div className="card-footer">
              <h5>Author: {videoData.author}</h5>
              <h5>Length: {videoData.length}</h5>

              <Link href='/'>
                <a className="btn btn-danger">Go Back</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default video;