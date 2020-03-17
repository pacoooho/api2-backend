import { Request, Response, NextFunction } from 'express'
import fs from 'fs-extra';
import path from 'path';

// Models
import Photo, { IPhoto } from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
};

export async function createPhoto(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { title, description } = req.body;
    console.log("req.filePath ", req.filePath);
    const newPhoto = { title, description, imagePath: req.filePath };
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo Saved Successfully',
        photo
    });
};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    console.log("req.filePath ", req.filePath);
    const imagePath = `uploads/${req.filePath}`;
    const photo = await Photo.deleteMany({ imagePath }) as IPhoto;
     if (photo) {
        await fs.unlink(path.resolve(imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(title);
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}