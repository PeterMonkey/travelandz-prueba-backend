import { Router } from 'express';
import { userService } from '../services/user.service';
import { validationToken } from '../middleware/validationToken';

const router = Router()

router.post('/register', userService.register)
router.post('/login', userService.login)
router.get('/transfer', validationToken, userService.getTransfers)

export default router;