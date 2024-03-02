import { Router } from 'express';
import { transfersCacheService } from '../services/transfersCache.service';

const router = Router()

router.get('/countries', transfersCacheService.getCountries)

export default router;