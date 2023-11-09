import React, { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./pages/addReview";
import MoviesList from "./pages/moviesList";
import Movie from "./components/movie";
import Login from "./pages/login";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MoviesList />} />
      <Route path="movies" element={<MoviesList />} />
      <Route path="movies/:id" element={<Movie />} />
      <Route path="movies/:id/review" element={<AddReview />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
