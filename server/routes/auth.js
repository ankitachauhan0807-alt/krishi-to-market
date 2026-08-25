import {Router} from 'express'; import {body} from 'express-validator'; import {register,login,me} from '../controllers/authController.js'; import {protect} from '../middleware/auth.js';
const r=Router();r.post('/register',[body('name').notEmpty(),body('email').isEmail(),body('password').isLength({min:6})],register);r.post('/login',login);r.get('/me',protect,me);export default r;
