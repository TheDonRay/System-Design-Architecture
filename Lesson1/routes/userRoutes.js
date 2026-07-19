// The Routes layer: maps URLs to controller functions. Nothing else.
// Note the order: /search and /paginate must come BEFORE /:id, otherwise
// Express treats "search" as an :id value and they never match.

import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/paginate', userController.paginateUsers);
router.get('/sort', userController.sortUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

export default router;
