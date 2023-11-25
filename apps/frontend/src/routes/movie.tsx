import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { deleteReview } from "../services/movies";
import type { Movie as MovieType } from "./moviesList";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
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
                <p>{movie.fullplot}</p>
                {user && <Link to={`/movies/${id}/review`}>Add Review</Link>}
              </CardBody>
            </Card>
            <br></br>
            <h2>Reviews</h2>
            <br></br>
            <section id="reviews" className="space-y-4">
              {movie.reviews.map((review, index) => {
                return (
                  <Card key={index}>
                    <CardHeader>
                      <h5>
                        {review.name +
                          " reviewed on " +
                          new Date(
                            Date.parse(review.date as string)
                          ).toDateString()}
                      </h5>
                    </CardHeader>
                    <CardBody>
                      <p>{review.review}</p>
                    </CardBody>
                    <CardFooter>
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
                    </CardFooter>
                  </Card>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
