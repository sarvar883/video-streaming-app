import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';

import { RequestHandler } from 'express';
import { IVideo } from '@/ts_interfaces/video';

const videos: IVideo[] = [
  { id: '1', title: 'Twice - Signal.mp4', author: 'Twice', length: '04:18', },
  { id: '2', title: 'Ozuna - Se Preparo.mp4', author: 'Ozuna', length: '03:50', },
  { id: '3', title: 'Clandestina.mp4', author: 'FILV', length: '02:29', },
  { id: '4', title: 'Mishil Theme.mp4', author: 'Seondeok', length: '14:47', },
];


export const getVideoData: RequestHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const video = videos.find(item => item.id === id);

  if (!video) {
    res.status(404).json({
      success: false,
      message: `Video with id ${id} is not found`,
      data: null,
    });

    return;
  }

  res.json({ success: true, data: video, });
});


export const getVideosList: RequestHandler = asyncHandler(async (req, res) => {
  res.json({ success: true, data: videos, });
});


export const streamVideo: RequestHandler = asyncHandler(async (req, res) => {
  // stream video with this id
  const id = req.params.id;

  // find video
  const video = videos.find(item => item.id === id);

  // IMPORTANT! /videos folder in the root folder should have all video files

  const PATH_TO_THE_VIDEO = path.resolve('videos', video.title);

  const stat = fs.statSync(PATH_TO_THE_VIDEO);

  const fileSize = stat.size;

  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(PATH_TO_THE_VIDEO, { start, end });

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);

    file.pipe(res);

  } else {

    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);

    fs.createReadStream(PATH_TO_THE_VIDEO).pipe(res);
  }
});