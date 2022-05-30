import React, { FC, useRef } from 'react';
import '../identification/identification.css';
import uniqid from 'uniqid';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hook/useUser';
import { Link } from 'react-router-dom';
import BlueButton from '../../components/BlueButton';
import axios from 'axios';
import { User } from '../../interfaces/user';
import readImgData from '../../helpers/readImgData';
import findUser from '../../helpers/findUser';
import getUserPosts from '../../helpers/getUserPosts';

async function createUser(user: Omit<User, '_id'>): Promise<User | null> {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:5000/create-user',
    data: user,
  });

  return response.data;
}

const RegistrationForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { setLoginedUser } = useUser();

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const username: HTMLInputElement = formRef.current?.username;
    const password: HTMLInputElement = formRef.current?.password;
    const email: HTMLInputElement = formRef.current?.email;
    const firstName: HTMLInputElement = formRef.current?.firstName;
    const age: HTMLInputElement = formRef.current?.age;
    const pfp: HTMLInputElement = formRef.current?.pfp;
    const city: HTMLInputElement = formRef.current?.city;

    if (
      [username, password, email, firstName, age].every((element) =>
        element.reportValidity()
      )
    ) {
      (async function formatData() {
        const isUserLogined = !!await findUser(username.value, password.value);

        if (!isUserLogined) {
          const imgData = await readImgData(pfp);
          const user = await createUser({
            name: firstName.value,
            age: parseInt(age.value),
            username: username.value,
            password: password.value,
            email: email.value,
            city: city.value,
            posts: [],
            pfp: imgData,
          });

          setLoginedUser(user);

          localStorage.setItem(
            'anikihref-blog-app-x1',
            `${username.value}+${password.value}`
          );

          navigate('/profile', { replace: true });
        }
      })();
    }
  }

  return (
    <form ref={formRef} className="login-page__register">
      <div className="login-page__title-block">
        <h2 className="login-page__title-text">Реєстрація</h2>

        <Link className="login-page__title-back" to="/identification">
          Назад
        </Link>
      </div>

      <div className="inputs-block">
        <input
          className="input login-page__register-username"
          placeholder="username*"
          name="username"
          type="text"
          required
        />

        <input
          className="input login-page__register-password"
          placeholder="password*"
          type="password"
          name="password"
          required
        />

        <input
          className="input login-page__register-email"
          placeholder="email*"
          name="email"
          type="email"
          required
        />

        <input
          className="input login-page__register-name"
          placeholder="name*"
          name="firstName"
          type="text"
          required
        />

        <input
          className="input login-page__register-age"
          placeholder="age*"
          name="age"
          type="text"
          required
        />

        <input
          className="input login-page__register-city"
          placeholder="city"
          name="city"
          type="text"
        />

        <input
          className="file-input"
          type="file"
          accept=".jpeg, .png, .jpg"
          required
          id="image-input"
          name="pfp"
        />
        <label className="custom-file-input" htmlFor="image-input">
          Завантажити аватар
        </label>
      </div>

      <div className="buttons-block">
        <BlueButton
          btnType="button"
          text="Створити аккаунт"
          cb={handleSubmit}
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
