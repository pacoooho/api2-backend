import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

const app: Application = express();

import authRoutes from './routes/auth';
import morgan from 'morgan';
import { getPhotos } from './pruebas/consulta';

// settings
app.set('port', 4000);
// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// setInterval(function() {  
//     getPhotos()
//     console.log('I am an interval');
// }, 5000); 
   
// routes  
app.use('/api', authRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));

export default app; 