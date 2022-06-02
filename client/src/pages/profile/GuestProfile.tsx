import React, {  FC, useEffect, useState } from 'react';
import PostItem from '../../components/PostItem';
import './posts.css';
import { Post } from '../../interfaces/post';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { User } from '../../interfaces/user';
import getUserPosts from '../../helpers/getUserPosts';
import { useParams } from 'react-router-dom';
import { findUsersByIds } from '../../helpers/findUser';

const GuestProfile: FC = () => {
  const { id: userId } = useParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User>();


  useEffect(() => {
    (async () => {
      const user = (await findUsersByIds([userId!]))[0]
      setUser(user)

      if (user) {
        const posts = await getUserPosts(user?._id);

        setPosts(posts)
      }
    })();
  }, []);


  return (
    <div className="posts">
      <TransitionGroup className={'posts'}>
        {posts.map((post) => (
          <CSSTransition key={post._id} timeout={500} classNames="posts__post">
            <PostItem post={post} author={user!} access='guest' />
          </CSSTransition>
        ))}
      </TransitionGroup>

    </div>
  );
};

export default GuestProfile;