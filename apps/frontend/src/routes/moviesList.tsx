import React, { useState, useEffect } from "react";
import { Review, find, getAll, getRatings } from "../services/movies";
import { Link, Form } from "react-router-dom";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Select,
  SelectItem,
  Button,
  Input,
} from "@nextui-org/react";

export type Movie = {
  _id: string;
  title: string;
  rated: string;
  plot: string;
  poster: string;
  year: number;
  fullplot: string;
  imdb: {
    rating: number;
    votes: number;
    id: number;
  };
  released: string;
  reviews: Review[];
};

export default function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveNextPage();
  }, [currentPage]);

  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") findByTitle();
    else if (currentSearchMode === "findByRating") findByRating();
    else retrieveMovies();
  };

  const retrieveMovies = async () => {
    try {
      setCurrentSearchMode("");
      const res = await getAll();
      console.log(res);
      setMovies(res.movies);
      setCurrentPage(res.page);
      setEntriesPerPage(res.entries_per_page);
    } catch (error) {
      console.error(error);
    }
  };
  const retrieveRatings = async () => {
    try {
      const res = await getRatings();
      console.log(res);
      //start with 'All ratings' if user doesn't specify any ratings
      setRatings(["All Ratings"].concat(res));
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const onChangeSearchRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const findMovies = async (query: string, by: string) => {
    try {
      const res = await find(query, by, currentPage);
      console.log(res);
      setMovies(res.movies);
    } catch (error) {
      console.error(error);
    }
  };
  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    findMovies(searchTitle, "title");
  };
  const findByRating = async () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      await retrieveMovies();
    } else {
      await findMovies(searchRating, "rated");
    }
  };

  return (
    <>
      <div className="container mx-auto space-y-4">
        <Form>
          <div className="flex justify-between gap-4">
            <Input
              type="text"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <Button type="button" onClick={findByTitle}>
              Search
            </Button>

            <Select onChange={onChangeSearchRating}>
              {ratings.map((rating) => {
                return (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                );
              })}
            </Select>
            <Button type="button" onClick={findByRating}>
              Search
            </Button>
          </div>
        </Form>
        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => {
            return (
              <Card key={movie._id}>
                <CardBody className="p-0">
                  <Link to={"/movies/" + movie._id}>
                    <Image
                      src={movie.poster}
                      width={200}
                      height={300}
                      fallbackSrc="https://via.placeholder.com/200x300"
                      alt="movie poster"
                      radius="none"
                    />
                  </Link>
                </CardBody>
                <CardFooter className="flex flex-col">
                  <Link
                    to={"/movies/" + movie._id}
                    className="font-semibold text-xl"
                  >
                    {movie.title}
                  </Link>
                  <span>{movie.imdb.rating}</span>
                  <span>
                    {new Date(
                      Date.parse(movie.released as string)
                    ).toDateString()}
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <br />
        Showing page: {currentPage}.
        <Button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get next {entriesPerPage} results
        </Button>
      </div>
    </>
  );
}
