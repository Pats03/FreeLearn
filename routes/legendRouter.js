import { allmedia,deletemedia } from "../controllers/legendController.js";
import { authenticateUser } from '../middleware/authMiddleware.js';
import {checkLegendRole} from '../middleware/validationMiddleware.js'
import { Router } from 'express';
const router = Router();
router.get('/',authenticateUser,checkLegendRole,allmedia);
router.delete(
  '/deletemedia/:mediaId',
  authenticateUser,
  checkLegendRole,
  deletemedia
);
router.post(
  '/verifycontent/:mediaId',
  authenticateUser,
  checkLegendRole,
  allmedia
);

export default router;
