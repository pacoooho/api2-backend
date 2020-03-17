import {  Schema, model, Document } from 'mongoose';
  import {IImageFile} from './ImageFile';

const schema = new Schema({
    files_id: [{ type: Schema.Types.ObjectId, ref: 'ImageFile' }],
    n: Number,
    data: Buffer,
    
});

export interface IImageChunk extends Document {
    _id:string;
    files_id?: IImageFile['_id'];
    n?: Number;
    data?: Buffer;
}

export default model<IImageChunk>('images.chunk', schema);