import React, { useState } from "react";
import { Review, createReview, updateReview } from "../services/movies";

import {
  Link,
  Form,
  useOutletContext,
  useParams,
  useLocation,
} from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { OutletContext } from "../layouts/RootLayout";

export default function AddReview() {
  const { user } = useOutletContext<OutletContext>();
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

  const onChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = async () => {
    const data: Review = {
      review: review,
      name: user?.name as string,
      user_id: user?.id as string,
      // get movie id direct from url
      movie_id: id as string,
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
        <Form>
          <Input
            type="text"
            label={`${editing ? "Edit" : "Create"} Review`}
            name="review"
            required
            value={review}
            onChange={onChangeReview}
          />
          <Button onClick={saveReview}>Submit</Button>
        </Form>
      )}
    </div>
  );
}
