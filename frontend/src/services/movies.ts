export type Review = {
  _id?: string;
  review: string;
  user_id: string;
  movie_id: string;
  name: string;
  date?: string;
  review_id?: string;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function getAll(page = 0) {
  const res = await fetch(`${baseUrl}/api/v1/movies?page=${page}`);
  const data = res.json();
  return data;
}
export async function get(id: string) {
  const res = await fetch(`${baseUrl}/api/v1/movies/id/${id}`);
  const data = res.json();
  console.log(data);
  return data;
}
export async function find(query: string, by = "title", page = 0) {
  const res = await fetch(
    `${baseUrl}/api/v1/movies?${by}=${query}&page=${page}`
  );
  const data = res.json();
  return data;
}
export async function createReview(data: Review) {
  const res = await fetch(`${baseUrl}/api/v1/movies/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}
export async function updateReview(data: Review) {
  const res = await fetch(`${baseUrl}/api/v1/movies/review`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
}
export async function deleteReview(id: string, userId: string) {
  const res = await fetch(`${baseUrl}/api/v1/movies/review`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review_id: id, user_id: userId }),
  });
  const data = res.json();
  return data;
}
export async function getRatings() {
  const res = await fetch(`${baseUrl}/api/v1/movies/ratings`);
  const data = res.json();
  return data;
}
