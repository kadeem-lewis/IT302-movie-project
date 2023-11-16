import MoviesDAO from "../dao/moviesDAO.js";
import { Request, Response, NextFunction } from "express";

export default class MoviesController {
  static async apiGetMovies(req:Request, res:Response, next:NextFunction) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage as string)
      : 20;
    const page = req.query.page ? parseInt(req.query.page as string) : 0;
    let filters:any = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }
    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    const response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };
    res.json(response);
  }

  static async apiGetMovieById(req:Request, res:Response, next:NextFunction) {
    try {
      const id = req.params.id || {};
      const movie = await MoviesDAO.getMovieById(id);
      if (!movie) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(movie);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRatings(req:Request, res:Response, next:NextFunction) {
    try {
      const propertyTypes = await MoviesDAO.getRatings();
      res.json(propertyTypes);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
