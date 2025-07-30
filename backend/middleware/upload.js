import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:  (  _, __, cb) => {
        cb(null, 'uploads/');
    },
    filename: ( _, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const filter = (_ , file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValid = allowedTypes.test(file.mimetype);
    cb(null, isValid);
}

export const upload = multer({
    storage: storage,
    fileFilter,
}); 



