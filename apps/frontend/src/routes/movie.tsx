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
  Chip,
  Divider,
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
    console.log(user?.id);
    try {
      await deleteReview(reviewId, user?.id as string);
      movie.reviews = movie.reviews.splice(index, 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container mx-auto space-y-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl">{movie.title}</h1>
            <span className="flex gap-4">
              <span>{movie.year}</span>
              <span>{movie.rated}</span>
              <span>{movie.runtime}</span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span>IMDb RATING</span>
            <span>{movie.imdb.rating}/10</span>
            <span>{movie.imdb.votes}</span>
            <span></span>
          </div>
        </div>
        <div className="flex gap-4">
          <Image src={movie.poster + "/100px250"} />
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              {movie.genres.map((genre) => (
                <Chip key={genre} variant="bordered">
                  {genre}
                </Chip>
              ))}
            </div>
            <div>{movie.plot}</div>
            <Divider />
            <span>
              Director:{" "}
              {movie.directors.map((director) => (
                <span key={director}>{director}</span>
              ))}
            </span>
            <Divider />
            <span>
              Writers:{" "}
              {movie.writers
                ? movie.writers.map((writer) => (
                    <span key={writer}>{writer.replace(/\(.*?\)/g, "")}</span>
                  ))
                : "None"}
            </span>
            <Divider />
            <span className="flex gap-4">
              Stars:{" "}
              {movie.cast.map((actor) => (
                <span key={actor}>{actor}</span>
              ))}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>
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
                            Date.parse(review.date as string),
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
    </>
  );
}
