import React, { useState, useEffect } from "react";
import { get, deleteReview } from "../services/movies";
import { Link, useLoaderData } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Movie = (props) => {
  const movie = useLoaderData();

  const deleteReview = async (reviewId, index) => {
    try {
      await deleteReview(reviewId, props.user.id);
      setMovie((prevState) => {
        prevState.reviews.splice(index, 1);
        return {
          ...prevState,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + props.match.params.id + "/review"}>
                    Add Review
                  </Link>
                )}
              </Card.Body>
            </Card>
            <br></br>
            <h2>Reviews</h2>
            <br></br>
            {movie.reviews.map((review, index) => {
              return (
                <div key={index}>
                  <div>
                    <h5>
                      {review.name +
                        " reviewed on " +
                        new Date(Date.parse(review.date)).toDateString()}
                    </h5>
                    <p>{review.review}</p>
                    {props.user && props.user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname:
                                "/movies/" + props.match.params.id + "/review",
                              state: { currentReview: review },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </div>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
