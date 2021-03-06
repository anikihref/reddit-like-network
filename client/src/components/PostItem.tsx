import axios from 'axios';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { findUsersByIds } from '../helpers/findUser';
import useUser from '../hook/useUser';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';
import AccountButton from './AccountButton';
import ContextMenu from './ContextMenu';
import InteractionLine from './InteractionLine';
import Modal from './Modal';

interface PostItemInterface {
  post: Post;
  access: 'owner' | 'guest';
  author: User
}

const PostItem: FC<PostItemInterface> = ({ post, access, author }) => {
  const [areSettingsActive, setAreSettingsActive] = useState<boolean>(false);
  const [isInfoActive, setIsInfoActive] = useState<boolean>(false);
  const [isLikedByModalActive, setIsLikedByModalActive] =
    useState<boolean>(false);
  const [usersWhoLiked, setUsersWhoLiked] = useState<User[]>([]);
  const { setLoginedUser } = useUser();

  async function handlePostDelete() {
    axios({
      method: 'delete',
      url: 'http://localhost:5000/post',
      data: {
        id: post._id,
      },
    });

    setLoginedUser((prev) => {
      return {
        ...prev,
        posts: prev?.posts.filter((postFilter) => postFilter._id !== post._id),
      } as User;
    });
  }

  async function handleLikedbyModalOpen() {
    setUsersWhoLiked(await getPostLikes());

    setIsLikedByModalActive(true);
  }

  async function getPostLikes(): Promise<User[]> {
    const userIdsResponse = await axios({
      method: 'get',
      url: `http://localhost:5000/post-likes/${post._id}`,
    });

    return await findUsersByIds(await userIdsResponse.data);
  }

  return (
    <div className="post posts__post">
      <div className="post__top-section">
        <AccountButton hasContextMenu={false} user={author!} />

        <div
          className="post__settings"
          data-context-trigger
          onClick={() => setAreSettingsActive((prev) => !prev)}
        >
          <div className="post__settings-dot"></div>
          <div className="post__settings-dot"></div>
          <div className="post__settings-dot"></div>

          <ContextMenu
            isActive={areSettingsActive}
            setIsActive={setAreSettingsActive}
          >
            <button
              className="context-menu__option"
              onClick={() => setIsInfoActive(true)}
            >
              ??????????????????
            </button>

            <button
              className="context-menu__option"
              onClick={handleLikedbyModalOpen}
            >
              ????????????????????
            </button>

            {access === 'owner' && (
              <button
                className="context-menu__option"
                onClick={handlePostDelete}
              >
                ????????????????
              </button>
            )}
          </ContextMenu>

          <Modal
            isActive={isLikedByModalActive}
            setIsActive={setIsLikedByModalActive}
          >
            {usersWhoLiked.toString()
              ? usersWhoLiked.map((user) => {
                  return (
                    <Link className='post__user-like' to={`/profile/${user._id}`} key={user._id}>
                      <AccountButton hasContextMenu={false} user={user} />
                    </Link>
                  );
                })
              : 'No users liked'}
          </Modal>

          {/* ???????????????? ?????????? ?? ?????????????????????? ?????? ???????? */}
          <Modal
            isActive={isInfoActive}
            setIsActive={setIsInfoActive}
            className="post__info-modal info-modal"
          >
            <div className="info-modal__title-block">
              <h3 className="info-modal__title-text">{post.title}</h3>
            </div>

            <div className="info-modal__information">
              <div className="info-modal__category">
                <p className="info-modal__item-title">??????????:</p>
                <p className="info-modal__item-value">{post.author}</p>
              </div>

              <div className="info-modal__category">
                <p className="info-modal__item-title">???????? ??????????????????:</p>
                <div className="info-modal__item-value">
                  <p className="info-modal__date-locale">
                    {new Date(post.createdAt.toString()).toLocaleDateString()}
                  </p>
                  <p className="info-modal__time-locale">
                    {new Date(post.createdAt.toString()).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="info-modal__category">
                <p className="info-modal__item-title">???????? ??????????????????:</p>
                <div className="info-modal__item-value">
                  <p className="info-modal__date-locale">
                    {new Date(post.updatedAt.toString()).toLocaleDateString()}
                  </p>
                  <p className="info-modal__time-locale">
                    {new Date(post.updatedAt.toString()).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="info-modal__category">
                <p className="info-modal__item-title">????????????????????:</p>
                <p className="info-modal__item-value">{post.importance}</p>
              </div>
              <div className="info-modal__category">
                <p className="info-modal__item-title">??????????:</p>
                <p className="info-modal__item-value">{post.likes}</p>
              </div>
              <div className="info-modal__category">
                <p className="info-modal__item-title">ID:</p>
                <p className="info-modal__item-value">{post._id}</p>
              </div>
            </div>
          </Modal>
        </div>
      </div>

      <div className="post__title-block">
        <h3 className="post__title-text">{post.title}</h3>
      </div>

      <div className="post__content">
        {post.img && (
          <div className="post__img">
            <img src={post.img} alt="" />
          </div>
        )}

        {post.content && (
          <div className="post__text-content">{post.content}</div>
        )}
      </div>

      <InteractionLine post={post} />
    </div>
  );
};

export default PostItem;
