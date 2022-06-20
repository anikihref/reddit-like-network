import React, { FC, useEffect, useState } from 'react';
import PostItem from '../../components/PostItem';
import './profile.css';
import { Post } from '../../interfaces/post';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { User } from '../../interfaces/user';
import getUserPosts from '../../helpers/getUserPosts';
import { useNavigate, useParams } from 'react-router-dom';
import { findUsersByIds } from '../../helpers/findUser';
import AccountButton from '../../components/AccountButton';
import BlueButton from '../../components/BlueButton';
import axios from 'axios';
import useUser from '../../hook/useUser';
import IChat from '../../interfaces/chat';

const GuestProfile: FC = () => {
  const { id: userId } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const { loginedUser } = useUser();
  const [chatExists, setChatExists] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const user = (await findUsersByIds([userId!]))[0];
      setUser(user);

      await axios({
        url: `http://localhost:5000/chat/member/${userId}`,
        method: 'GET'
      })
        .then(res => res.data)
        .then(data => {
          data.find((chat: IChat) => {
            const existingChat = chat.members.find((member: string) => {
              return member === loginedUser?._id
            })
            
            if (existingChat) {
              setChatExists(true)
              return true
            }
          })
        })

      if (user) {
        const posts = await getUserPosts(user?._id);

        setPosts(posts);
      }
    })();
  }, []);

  async function createChat() {
    if (!chatExists) {
      await axios({
        method: 'POST',
        url: 'http://localhost:5000/chat',
        data: { members: [user?._id, loginedUser?._id] },
      });
    }
    navigate('/chats')
  }

  return (
    <div className="guest-profile">
      <div className="guest-profile__info">
        <AccountButton user={user!} hasContextMenu={false} />

        <div className="guest-profile__info-buttons">
          <BlueButton
            btnType="button"
            cb={async () => await createChat()}
          >Написати повідомлення</BlueButton>
        </div>
      </div>

      <div className="posts">
        <TransitionGroup className={'posts'}>
          {posts.map((post) => (
            <CSSTransition
              key={post._id}
              timeout={500}
              classNames="posts__post"
            >
              <PostItem post={post} author={user!} access="guest" />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default GuestProfile;
