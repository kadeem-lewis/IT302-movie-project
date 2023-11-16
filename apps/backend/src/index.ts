import mongodb from "mongodb";
import app from "./server.js";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from './dao/reviewsDAO.js'
import "dotenv/config";

async function main() {

  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI as string);

  const port = process.env.PORT || 8000;

  try {
    await client.connect();
    await MoviesDAO.injectDB(client);
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log("server is running on port:" + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main().catch(console.error);
