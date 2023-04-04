import express from 'express';
import { signInUsers, signUpUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/signup', signUpUsers);
router.post('/signin', signInUsers);
export default router;
