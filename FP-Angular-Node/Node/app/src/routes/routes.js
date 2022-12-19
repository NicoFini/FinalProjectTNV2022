import express from "express";
import { getAllFavourites } from "../controllers/favourites-controller.js";

const API_ROOT = '/api';

import { getRating, createRating, updateRating, deleteRating } from "../controllers/ratings-controller.js";

const router = express.Router();

router.get(`${API_ROOT}/rating/:userId/:movieId`, getRating);
router.post(`${API_ROOT}/rating`, createRating);
router.patch(`${API_ROOT}/rating/:movie_id/:user_id`, updateRating);
router.delete(`${API_ROOT}/rating/:id`, deleteRating);


router.get(`${API_ROOT}/favourite/:userId`, getAllFavourites);

export default router;
