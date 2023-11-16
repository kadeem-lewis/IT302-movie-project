import mongodb from "mongodb"
import { User } from "../api/reviews.controller.js"
const ObjectId = mongodb.ObjectId

let reviews:any
export default class ReviewsDAO {
  static async injectDB(conn:any) {
    if(reviews) {
      return
    } try {
      reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
    } catch(e) {
      console.error(`unable to establish connection handle in reviewDAO: ${e}`)
    }
  }
  static async addReview(movieId:string, user:User, review:string, date:Date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: new ObjectId(movieId)
      }
      return await reviews.insertOne(reviewDoc)
    } catch(e) {
      console.error(`unable to post review: ${e}`)
      console.error(e)
      return { error: e }
    }
  }
  static async updateReview(reviewId:string, userId:string, review:string, date:Date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) },
        { $set: { review: review, date: date } }
      )
      return updateResponse
    } catch(e) {
      console.error(`unable to update review: ${e}`)
      console.error(e)
      return { error: e}
    }
  }
  static async deleteReview(reviewId:string, userId:string) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      })
      return deleteResponse
    } catch(e:any) {
      console.error(`unable to delete review: ${e}`)
      console.error(e)
      return { error: e.message }
    }
  }
  
  
}
