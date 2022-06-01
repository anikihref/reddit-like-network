import axios from "axios";
import { Post } from "../interfaces/post";

export default async function getUserPosts(userId: string): Promise<Post[]> {
  const response = await axios({
    method: 'get',
    url: `http://localhost:5000/post/author/${userId}`
  })

  return await response.data
}