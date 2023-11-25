import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { get } from "./services/movies";

import AddReview from "./routes/addReview";
import MoviesList from "./routes/moviesList";
import Movie from "./routes/movie";
import Login from "./routes/login";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./routes/errorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<MoviesList />} />
      <Route path="movies" element={<MoviesList />} />
      <Route
        path="movies/:id"
        element={<Movie />}
        loader={async ({ params }) => {
          return get(params.id as string);
        }}
      />
      <Route
        path="movies/:id/review"
        element={<AddReview />}
      />
      <Route path="login" element={<Login />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
