import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    _id: String,
    length: Number,
    chunkSize: Number,
    uploadDate: {'type': Date, 'default': Date.now},
    filename: String,
    md5: String,
    contentType: String
});

export interface IImageFile extends Document {
  _id:string;
    length?: number;
    chunkSize?: number;
    uploadDate?: Date;
    filename: string;
    md5?: string;
    contentType?: string;
}

export default model<IImageFile>('images.file', schema);