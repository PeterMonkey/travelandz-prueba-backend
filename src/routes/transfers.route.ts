import { Router } from 'express';
import { transfersCacheService } from '../services/transfersCache.service';

const router = Router()

router.get('/countries', transfersCacheService.getCountries)
router.get('/destinations', transfersCacheService.getDestinations)
router.get('/terminals', transfersCacheService.getTerminals)
router.get('/hotels', transfersCacheService.getHotels)

export default router;