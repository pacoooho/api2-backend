import { Request, Response, NextFunction } from 'express'
import fs from 'fs';
import path from 'path';

import ImageFile, { IImageFile } from '../models/ImageFile';
import ImageChunk, { IImageChunk } from '../models/ImageChunks'

 

export async function getFileAtlas(req: Request, res: Response, next: NextFunction) {
  // console.time("start")
  const path = req.filePath.slice(8, req.filePath.length);
  //  console.log("path ",path)
  const image = await ImageFile.find({ filename: path });
  //  console.log(image[0]._id)
  const imageChunks = await ImageChunk.find({ files_id: image[0]._id }).sort({ n: 1 });
  let fileData: any = [];
  await imageChunks.forEach(chunk => {
    fileData.push(chunk.data?.toString('base64'));
    //  console.log("chunks ", chunk.data?.toString('base64'));  
  })
  //  console.log("image ",fileData.join(""));  
  let finalFile: string = 'data:' + image[0].contentType + ';base64,' + fileData.join('');
  let finalFile2 = finalFile.split(';base64,').pop();
  await fs.writeFile(`uploads/${path}`, finalFile2, { encoding: 'base64' }, function (err) {
    // console.timeEnd("start")
    // console.log('File created');
  });
  next();
};