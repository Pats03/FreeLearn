import {
  fetchmedia,
  recentMedia,
  editmedia,
  singlemedia,
  pending,
} from '../controllers/teacherController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { checkAdminRole } from '../middleware/validationMiddleware.js';
import { Router } from 'express';
const router = Router();
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });


router.get('/teachercontent', authenticateUser, fetchmedia);
router.get('/recentcontent', authenticateUser, recentMedia);
router.patch('/editmedia/:mediaId', authenticateUser,upload.single('file'), editmedia);
router.get('/singlemedia/:mediaId', authenticateUser, singlemedia);
router.get('/pending', checkAdminRole,authenticateUser, pending);

export default router;
