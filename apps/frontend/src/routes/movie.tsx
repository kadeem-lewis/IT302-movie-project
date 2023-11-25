import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { deleteReview } from "../services/movies";
import type { Movie as MovieType } from "./moviesList";
import { Card,CardHeader, CardBody, Button } from "@nextui-org/react";
import {Image} from "@nextui-org/react"
import { OutletContext } from "../layouts/RootLayout";

export default function Movie() {
  const movie = useLoaderData() as MovieType;
  const { user } = useOutletContext<OutletContext>();
  const { id } = useParams();

  // recursion error, since I am using for the fetch request and the function name
  // since im using loader, I need to do this a different way
  const handleDeleteReview = async (reviewId: string, index: number) => {
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
      <div className="container mx-auto">
        <div className="grid grid-cols-2">

            <Image src={movie.poster + "/100px250"} />
          <div>

            <Card>
              <CardHeader>{movie.title}</CardHeader>
              <CardBody>
                <p>{movie.plot}</p>
                {user && <Link to={`/movies/${id}/review`}>Add Review</Link>}
              </CardBody>
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
                        new Date(
                          Date.parse(review.date as string),
                        ).toDateString()}
                    </h5>
                    <p>{review.review}</p>
                    {user && user.id === review.user_id && (
                      <div className="grid grid-cols-2">

                          <Link
                            to={`/movies/${id}/review`}
                            state={{ currentReview: review }}
                          >
                            Edit
                          </Link>

                          <Button
                            onClick={() =>
                              handleDeleteReview(review._id as string, index)
                            }
                          >
                            Delete
                          </Button>
                      </div>


                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
