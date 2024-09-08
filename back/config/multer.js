import multer from 'multer';
import {storage} from './cloud.js';

const upload = multer({storage:storage});

// const multerPost = upload.array("profileImage");
// const multerHeader = upload.array("headerImage");

const multerFields = upload.fields([
    { name: 'profileImage', maxCount: 1 },  // Adjust maxCount as needed
    { name: 'headerImage', maxCount: 1 },
    { name: 'imagePost', maxCount: 1 }
]);

export {multerFields}