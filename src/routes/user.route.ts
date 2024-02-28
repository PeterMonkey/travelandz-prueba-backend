import { Router } from 'express';
import { userService } from '../services/user.service';

const router = Router()

router.post('/register', userService.register)
router.post('/login', userService.login)
router.get('/transfer', userService.getTransfers)

export default router;