import express from 'express';
import {
  getSettingController,
  updateSettingController,
  getAllSettingsController
} from '../controllers/systemSettingsController.js';

const router = express.Router();

router.get('/:key', getSettingController);
router.put('/:key', updateSettingController);
router.get('/', getAllSettingsController);

export default router;
