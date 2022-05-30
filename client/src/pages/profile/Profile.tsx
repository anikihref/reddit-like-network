import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import BlueButton from '../../components/BlueButton';
import Modal from '../../components/Modal';
import PostItem from '../../components/PostItem';
import useUser from '../../hook/useUser';
import './posts.css';
import { importance } from '../../interfaces/post';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import readImgData from '../../helpers/readImgData';
import axios from 'axios';
import { User } from '../../interfaces/user';
import getUserPosts from '../../helpers/getUserPosts';

const Profile = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [importance, setImportance] = useState<importance>(1);
  const { loginedUser, setLoginedUser } = useUser();

  useEffect(() => {
    (async () => {
      if (loginedUser) {
        const posts = await getUserPosts(loginedUser?._id);

        setLoginedUser((prev) => {
          return {
            ...prev,
            posts,
          } as User;
        });
      }
    })();
  }, []);

  function handleSelectImportance(e: ChangeEvent<HTMLSelectElement>) {
    const value = +e.target.value;

    if ([1, 2, 3, 4, 5].some((num) => num === value)) {
      setImportance(value as importance);
    }
  }

  async function handleImgInputChange(e: ChangeEvent<HTMLInputElement>) {
    const data = await readImgData(e.target);

    setImagePreview(data);
  }

  function handleFormMove(e: MouseEvent, movePoint: number) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const step: HTMLDivElement | null = target?.closest('.posts-form__step');

    if (!step) return;

    const inputs: HTMLInputElement[] = Array.from(
      step?.querySelectorAll('input')
    );

    if (
      inputs.every((input) => {
        return input.reportValidity();
      })
    ) {
      const nextStep = document.querySelector(
        `.posts-form__step[data-step='${+step.dataset.step! + movePoint}']`
      );

      if (nextStep) {
        const ANIMATION_TIMEOUT: number = 500;

        step.classList.add('posts-form__step-hidden');

        setTimeout(() => {
          step.classList.add('hide');
          nextStep.classList.remove('hide');
          nextStep?.classList.remove('posts-form__step-hidden');
        }, ANIMATION_TIMEOUT);
      }
    }
  }

  async function handleCreatePost(e: MouseEvent) {
    e.preventDefault();

    const title = formRef.current?.querySelector(
      "[name='title']"
    ) as HTMLInputElement;
    const importance = formRef.current?.querySelector(
      "[name='importance']"
    ) as HTMLInputElement;
    const content = formRef.current?.querySelector(
      "[name='content']"
    ) as HTMLInputElement;

    const response = await axios({
      url: 'http://localhost:5000/create-post',
      method: 'post',
      data: {
        title: title?.value,
        content: content?.value,
        importance: +importance?.value as importance,
        img: imagePreview,
        author: loginedUser!._id,
      },
    });

    const post = await response.data;

    setLoginedUser((prev) => {
      return {
        ...prev,
        posts: [...prev?.posts!, post],
      } as User;
    });

    setIsActiveModal(false);
    setImagePreview('');
  }

  return (
    <div className="posts">
      <button
        className="posts__add-btn"
        onClick={() => setIsActiveModal(true)}
        type="button"
      >
        add new post
      </button>

      <TransitionGroup className={'posts'}>
        {loginedUser?.posts.map((post) => (
          <CSSTransition key={post._id} timeout={500} classNames="posts__post">
            <PostItem post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>

      <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
        <div className="modal__title-block">
          <h2 className="modal__title-text">
            Заповніть форму та додайте допис
          </h2>
        </div>

        <form ref={formRef} className="modal__posts-form posts-form">
          <div className="posts-form__step posts-form__step-1" data-step="1">
            <div className="inputs-block">
              <input
                type="text"
                placeholder="Заголовок"
                className="input modal__posts-input"
                name="title"
                required
              />

              <input
                type="text"
                placeholder="Текст"
                className="input modal__posts-input"
                name="content"
              />

              <div className="input-wrapper modal__posts-importance">
                <label
                  className="modal__posts-importance-label"
                  htmlFor="importance"
                >
                  Важливість
                </label>
                <select
                  id="importance"
                  value={importance}
                  className="input modal__posts-input modal__posts-input-importance"
                  name="importance"
                  onChange={handleSelectImportance}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className="modal__btn-block btn-block">
              <BlueButton
                btnType="button"
                text="Далі"
                cb={(e) => handleFormMove(e, 1)}
              />
            </div>
          </div>

          <div
            className="posts-form__step posts-form__step-hidden posts-form__step-2 hide"
            data-step="2"
          >
            <div className="inputs-block">
              <input
                type="file"
                accept=".jpg, .png, .jpeg"
                className="file-input"
                id="posts-img"
                name="image"
                onChange={handleImgInputChange}
              />
              <label htmlFor="posts-img" className="custom-file-input">
                Додати світлину
              </label>

              <div className="modal__img-preview">
                {imagePreview ? <img src={imagePreview} alt="post" /> : null}
              </div>
            </div>

            <div className="modal__btn-block buttons-block">
              <BlueButton
                btnType="button"
                text="Назад"
                cb={(e) => handleFormMove(e, -1)}
              />
              <BlueButton
                btnType="button"
                text="Готово"
                cb={handleCreatePost}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* <WebSock /> */}
    </div>
  );
};

export default Profile;
