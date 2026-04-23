import { Request, Response } from 'express';
import { mealService } from '../services/meal.service';

export const getAllMeals = (_req: Request, res: Response) => {
  const meals = mealService.getAll();
  res.json({ success: true, data: meals });
};

export const getMealById = (req: Request, res: Response) => {
  const meal = mealService.getById(req.params.id);
  if (!meal) {
    res.status(404).json({ success: false, message: 'Meal not found' });
    return;
  }
  res.json({ success: true, data: meal });
};

export const searchMeals = (req: Request, res: Response) => {
  const { q = '', category } = req.query;
  const results = mealService.search(q as string, category as string);
  res.json({ success: true, data: results, count: results.length });
};
