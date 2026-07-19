// Single mount point for every versioned route group.
// Adding a new resource = one import + one router.use() line here.

import { Router } from 'express';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/users', userRoutes);

export default router;
