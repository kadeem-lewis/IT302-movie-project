import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { deleteReview } from "../services/movies";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function Movie() {
  const movie = useLoaderData();
  const { user } = useOutletContext();
  const { id } = useParams();

  // recursion error, since I am using for the fetch request and the function name
  // since im using loader, I need to do this a different way
  const handleDeleteReview = async (reviewId, index) => {
    console.log(reviewId, index);
    console.log(user.id);
    try {
      await deleteReview(reviewId, user.id);
      movie.reviews = movie.reviews.splice(index, 1);
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
                {user && <Link to={`/movies/${id}/review`}>Add Review</Link>}
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
                    {user && user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={`/movies/${id}/review`}
                            state={{ currentReview: review }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() =>
                              handleDeleteReview(review._id, index)
                            }
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
}
