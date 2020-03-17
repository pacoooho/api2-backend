import {Router} from 'express';
import {TokenValidacion} from '../libs/verifyToken';
import {signin,signup,profile,profile2,profile3,  testing} from '../controllers/auth.controller';
const router: Router = Router();
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } 
from '../controllers/photo.controller'

import imagesUpload from '../libs/multerAtlas'
import { getFileAtlas } from '../controllers/downLoad';
import {deletePhotoAtlas} from '../libs/prueba'

router.post('/signin', signin);
router.post('/signup', signup); 

router.route('/photos')
 .get(getPhotos) 
  // .post( upload.single('image'), createPhoto);
 .post(imagesUpload, getFileAtlas, createPhoto);

router.route('/photos/:id')
 .get(getPhoto)
 .delete(deletePhotoAtlas  , deletePhoto)
 .put(updatePhoto);

router.get('/tasks',TokenValidacion, profile);
router.get('/tasks2',TokenValidacion, profile2);
router.get('/tasks3',TokenValidacion, profile3);

router.get('/private-tasks',TokenValidacion, testing);

export default router;