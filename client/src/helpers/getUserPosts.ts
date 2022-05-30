import axios from "axios";
import { Post } from "../interfaces/post";

export default async function getUserPosts(userId: string): Promise<Post[]> {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:5000/fetch-posts',
    data: {
      id: userId
    }
  })

  return await response.data
}