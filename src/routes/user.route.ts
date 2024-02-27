import { Router } from 'express';
import { userService } from '../services/user.service';

const router = Router()

router.post('/register', userService.register)

export default router;