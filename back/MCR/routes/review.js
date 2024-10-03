import express from 'express';
const router = express.Router();
import { 
    administrator, 
    protect,
    Admin_Or_Owner_Review,
 } from '../../middleware/admin.js';
import asyncHandler from '../../middleware/asyncHandler.js';
import { 
    create, 
    update,
    deleteReview,
    like

} from '../controllers/review.js';


router.post('/create/:id', protect, asyncHandler(create))
router.post('/like/:reviewId', protect, asyncHandler(like))
router.put('/:reviewId', protect, asyncHandler(update))
router.delete('/delete/:reviewId/', protect, Admin_Or_Owner_Review, asyncHandler(deleteReview))

export default router;