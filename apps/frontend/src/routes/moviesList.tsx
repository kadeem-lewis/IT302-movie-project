import React, { useState, useEffect } from "react";
import { Review, find, getAll, getRatings } from "../services/movies";
import { Link, Form } from "react-router-dom";

import {Card, CardHeader, CardBody, CardFooter, Image,Select, SelectItem, Button,Input} from "@nextui-org/react";

export type Movie = {
  _id: string;
  title: string;
  rated: string;
  plot: string;
  poster: string;
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
    <div>
      <div className="container mx-auto">
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
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => {
            return (
                <Card key={movie._id}>
                  <CardHeader>
                  <Image
                    src={movie.poster}
                    fallbackSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnelowvision.com%2Fwp-content%2Fuploads%2F2018%2F11%2FPicture-Unavailable.jpg&f=1&nofb=1&ipt=7a40670a4fdad80fa0665a9fa6654d76a1beb59968032d9644b3cf98568e619b&ipo=images"
                    width={200}
                    height={300}
                    alt="movie poster"
                  />
                  </CardHeader>
                  <CardBody>
                    <span className="font-semibold text-xl">{movie.title}</span>
                    <span>Rating: {movie.rated}</span>
                    <span>{movie.plot}</span>
                  </CardBody>
                  <CardFooter>
                  <Link to={"/movies/" + movie._id}>View Reviews</Link>
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
    </div>
  );
}
