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

  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  const retrieveMovies = async () => {
    const res = await getAll();
    console.log(res);
    setMovies(res.movies);
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
    const res = await find(query, by);
    console.log(res);
    setMovies(res.movies);
  };
  const findByTitle = () => {
    findMovies(searchTitle, "title");
  };
  const findByRating = async () => {
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
      </Container>
      <Row>
        {movies.map((movie) => {
          return (
            <Col key={movie.title}>
              <Card style={{ width: "18rem" }}>
                <Card.Img src={movie.poster + "/100px180"} />
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
    </div>
  );
}
