import React, { FC, useRef } from 'react';
import '../identification/identification.css';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hook/useUser';
import { Link } from 'react-router-dom';
import findUser from '../../helpers/findUser';
import BlueButton from '../../components/BlueButton';
import getUserPosts from '../../helpers/getUserPosts';
import useMessages from '../../hook/useMessages';
import uniqid from 'uniqid'

const LoginForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { setLoginedUser } = useUser();
  const navigate = useNavigate();
  const { setMessages } = useMessages();

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const username: HTMLInputElement = formRef.current?.username;
    const password: HTMLInputElement = formRef.current?.password;

    if ([username, password].every((element) => element.reportValidity())) {
      (async () => {
        const data = await findUser(username.value, password.value);

        if (data) {
          data.posts = await getUserPosts(data._id);

          setLoginedUser(data);
          navigate('/profile', { replace: true });
          setMessages((prev) => {
            prev.push({
              text: `Hi ${data.name}! Welcome to anikihref react blog`,
              title: `${data.name} connected`,
              id: uniqid()
            });

            return prev;
          });
        }
      })();
    }
  }

  return (
    <form ref={formRef} className="login-page__login">
      <div className="login-page__title-block">
        <h2 className="login-page__title-text">Вхід</h2>

        <Link className="login-page__title-back" to="/identification">
          Назад
        </Link>
      </div>

      <div className="inputs-block">
        <input
          className="input login-page__login-username"
          placeholder="username*"
          type="text"
          name="username"
          required
        />

        <input
          className="input login-page__login-password"
          placeholder="password*"
          type="password"
          name="password"
          required
        />
      </div>

      <div className="buttons-block">
        <BlueButton btnType="button" text="Увійти" cb={handleSubmit} />
      </div>
    </form>
  );
};

export default LoginForm;
