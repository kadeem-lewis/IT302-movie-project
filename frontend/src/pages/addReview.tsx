import React, { useState } from "react";
import { createReview, updateReview } from "../services/movies";

import {
  Link,
  Form as RouterForm,
  useOutletContext,
  useParams,
  useLocation,
} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddReview() {
  const { user } = useOutletContext();
  const { id } = useParams();
  const { state } = useLocation();
  let editing = false;
  let initialReviewState = "";

  if (state && state.currentReview) {
    editing = true;
    initialReviewState = state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = async () => {
    var data = {
      review: review,
      name: user.name,
      user_id: user.id,
      // get movie id direct from url
      movie_id: id,
    };
    if (editing) {
      try {
        // get existing review id
        data.review_id = state.currentReview._id;
        const response = await updateReview(data);
        setSubmitted(true);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await createReview(data);
        setSubmitted(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={`/movies/${id}`}>Back to Movie</Link>
        </div>
      ) : (
        <Form as={RouterForm}>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}
