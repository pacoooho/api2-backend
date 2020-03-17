import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
function imageFilter(req: Request, file: any, callback: any) {
	if (path.extname(file.originalname).toLowerCase().
	match(/\.(jpg|jpeg|png|bmp|gif|mp4|m4v|flv|ogv|webm)$/))
		callback(null, true)
	else
		callback(new Error('Only image files are allowed!'), false)
}
const URI = process.env.MONGODB_URI+''
/* MONGODB */
const storage = new GridFsStorage({
	url: URI,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req: Request, file: any) => {
		console.log(file)
		req.filePath = 'uploads/' + file.originalname;
		return new Promise((resolve, reject) => {
			const filename = file.originalname
			const fileInfo = {
				filename,
				bucketName: 'images'
			}
			resolve(fileInfo);
		})
	}
})
   const imagesUpload= multer({
	fileFilter: imageFilter,
	storage
}).array('image');
  
  export default imagesUpload;
