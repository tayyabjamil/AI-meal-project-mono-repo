import { Router } from 'express';
import { getAllMeals, getMealById, searchMeals } from '../controllers/meal.controller';

const router = Router();

router.get('/', getAllMeals);
router.get('/search', searchMeals);
router.get('/:id', getMealById);

export default router;
