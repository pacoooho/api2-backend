import { Request, Response, NextFunction } from 'express'
import fs from 'fs-extra';
import path from 'path';

// Models
import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos( )  {
    const photos = await Photo.find();
    console.log(photos);
}