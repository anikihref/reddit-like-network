import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import useUser from '../hook/useUser';
import { Post } from '../interfaces/post';

interface InteractionLineProps {
  post: Post;
}



const InteractionLine: FC<InteractionLineProps> = ({ post }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const {loginedUser} = useUser()

  useEffect(() => {
    (async () => setLiked(await checkIsLiked()))()  
  }, [])


  async function checkIsLiked(): Promise<boolean> {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/post-likedby',
      data: {
        id: post._id,
      }
    })
    
    return await response.data.some((userId: string) => userId === loginedUser?._id)
  }

  async function handleLike() {
    const movePoint = !liked ? 1 : -1;
    const likes: number = post.likes + movePoint


    await axios({
      method: 'put',
      url: 'http://localhost:5000/like-post',
      data: {
        likes,
        id: post._id,
        authorId: loginedUser?._id,
        liked
      }
    })

    post.likes = likes
    setLiked((prev) => !prev);
  }

  return (
    <div className="interaction-line">
      <div
        className={`interaction-line__likes ${liked ? 'active' : ''}`}
        onClick={handleLike}
      >
        <div className="interaction-line__likes-text ">Сподобалося:</div>

        <div className="interaction-line__likes-count">{post.likes}</div>
      </div>
    </div>
  );
};

export default InteractionLine;
