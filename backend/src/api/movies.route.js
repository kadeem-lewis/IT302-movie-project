import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Retrieve a list of movies.
 *     description: Retrieve a list of movies from sample_mflix MongoDB database.
 *     tags: [movies]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number to return for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           maximum: 9999
 *           format: int32
 *
 *     responses:
 *       200:
 *         description: A list of movies.
 */

router.route("/").get(MoviesController.apiGetMovies);

router.route("/id/:id").get(MoviesController.apiGetMovieById)

router.route("/ratings").get(MoviesController.apiGetRatings)

/**
 * @swagger
 * /api/v1/movies/review:
 *   post:
 *     summary: Create a movie review.
 *     description: Create a new review for a movie in the sample_mflix MongoDB database.
 *     tags: [reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: string
 *                 example: 573a1390f29313caabcd42e8
 *               review:
 *                 type: string
 *                 example: This movie was very boring
 *               user_id:
 *                 type: string
 *                 example: 123456
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Acknowledgement that POST was successful.
 *                   example: true
 *                 insertedId:
 *                   type: integer
 *                   description: The new review ID.
 *                   example: 6536e4847244a30f5b7fb0a1
 */

/**
 * @swagger
 * /api/v1/movies/review:
 *   delete:
 *     summary: Delete a movie review.
 *     description: Delete a review for a movie in the sample_mflix MongoDB database.
 *     tags: [reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_id:
 *                 type: string
 *                 example: 653b4aa1fbd3e0637d4e3982
 *               user_id:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Acknowledgement that DELETE was successful.
 *                   example: true
 *                 deletedCount:
 *                   type: integer
 *                   description: The delete count.
 *                   example: 1
 */

/**
 * @swagger
 * /api/v1/movies/review:
 *   put:
 *     summary: Update a movie review.
 *     description: Update a review for a movie in the sample_mflix MongoDB database.
 *     tags: [reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie_id:
 *                 type: string
 *                 example: 573a1390f29313caabcd42e8
 *               review:
 *                 type: string
 *                 example: This movie was very good
 *               review_id:
 *                 type: string
 *                 example: 653b4aa1fbd3e0637d4e3982
 *               user_id:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Acknowledgement that POST was successful.
 *                   example: true
 *                 upsertedId:
 *                   type: integer | null
 *                   description: The new review ID.
 *                   example: null
 *                 upsertedCount:
 *                   type: integer
 *                   description: The upserted count.
 *                   example: 0
 *                 modifiedCount:
 *                   type: integer
 *                   description: The modified count
 *                   example: 1
 *                 matchedCount:
 *                   type: integer
 *                   description: The matched count
 *                   example: 1
 */

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
