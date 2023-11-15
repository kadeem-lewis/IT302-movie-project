import React, { useState, useEffect } from "react";
import { find, getAll, getRatings } from "../services/movies";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function MoviesList(props) {
  const [movies, setMovies] = useState([]);
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
    setCurrentSearchMode("");
    const res = await getAll();
    console.log(res);
    setMovies(res.movies);
    setCurrentPage(res.page);
    setEntriesPerPage(res.entries_per_page);
  };
  const retrieveRatings = async () => {
    const res = await getRatings();
    console.log(res);
    //start with 'All ratings' if user doesn't specify any ratings
    setRatings(["All Ratings"].concat(res));
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const onChangeSearchRating = (e) => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  };

  const findMovies = async (query, by) => {
    const res = await find(query, by, currentPage);
    console.log(res);
    setMovies(res.movies);
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
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchRating}>
                  {ratings.map((rating) => {
                    return (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByRating}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {movies.map((movie) => {
            return (
              <Col key={movie._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    src={
                      movie.poster
                        ? `${movie.poster}/100px180`
                        : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnelowvision.com%2Fwp-content%2Fuploads%2F2018%2F11%2FPicture-Unavailable.jpg&f=1&nofb=1&ipt=7a40670a4fdad80fa0665a9fa6654d76a1beb59968032d9644b3cf98568e619b&ipo=images"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Rating: {movie.rated}</Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <br />
        Showing page: {currentPage}.
        <Button
          variant="link"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get next {entriesPerPage} results
        </Button>
      </Container>
    </div>
  );
}
