import { Request, Response, NextFunction } from 'express'
import fs from 'fs-extra';
import path from 'path';

// Models
import Photo, { IPhoto } from '../models/Photo';
import ImageFile, { IImageFile } from '../models/ImageFile';
import ImageChunks, { IImageChunk } from '../models/ImageChunks';

export async function deletePhotoAtlas(req: Request, res: Response, next: NextFunction) {
    console.time("time deletePhotoAtlas")
    const { id } = req.params;
    const photo = await Photo.findById(id);
    const filename = photo?.imagePath.slice(8, photo?.imagePath.length) + "";
    req.filePath = filename + "";
    const imageFile = await ImageFile.find({ filename });
    let files_id = imageFile[0]._id;
    const imageChunks = await ImageChunks.find({ files_id });
    await ImageFile.deleteMany({ filename }) as IImageFile;
    await ImageChunks.deleteMany({ files_id: files_id }) as IImageChunk;
    console.timeEnd("time deletePhotoAtlas")
    next()
};



// export async function getPhotos(req: Request, res: Response): Promise<Response> {
//     const photos = await Photo.find();
//     return res.json(photos);
// };

// export async function createPhoto(req: Request, res: Response, next: NextFunction): Promise<Response> {
//     const { title, description } = req.body;
//     console.log("req.filePath ", req.filePath);
//     const newImageFile = { title, description, imagePath: req.filePath };
//     const imageFile = new Photo(newImageFile);
//     await imageFile.save();
//     return res.json({
//         message: 'Photo Saved Successfully',
//         imageFile
//     });
// };

// export async function getPhoto(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;
//     const photo = await Photo.findById(id);
//     return res.json(photo);
// }


// export async function updatePhoto(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     console.log(title);
//     const updatedPhoto = await Photo.findByIdAndUpdate(id, {
//         title,
//         description
//     });
//     return res.json({
//         message: 'Successfully updated',
//         updatedPhoto
//     });
// }