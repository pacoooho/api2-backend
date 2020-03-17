import multer from 'multer'
import path from 'path'


// Settings

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        // console.log("file" ,file)
        const moonLanding = new Date();
        const nameFile = moonLanding.getTime() + path.extname(file.originalname)
        req.filePath = 'uploads/' + nameFile;
        cb(null, nameFile)
    }
});
export default multer({ storage });
  