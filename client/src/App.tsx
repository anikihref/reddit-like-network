import { useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import './css/index.css';
import Identification from './pages/identification/Identification';
import LoginForm from './pages/login/LoginForm';
import Profile from './pages/profile/Profile';
import RegistrationForm from './pages/register/RegistrationForm';
import useUser from './hook/useUser';
import findUser from './helpers/findUser';
import axios from 'axios';
import getUserPosts from './helpers/getUserPosts';
import contextMenuCloser, { removeContextMenuCloser } from './helpers/contextMenuCloser';
import useMessages from './hook/useMessages';
import MessagesStack from './components/MessagesStack';
import logIn from './helpers/logIn';


async function connect() {
  await axios({
    url: 'http://localhost:5000/connect',
    method: 'get'
  }).catch((e) => {
    console.log('connect error', e);
  });
}
function App() {
  const { setLoginedUser } = useUser();
  const navigate = useNavigate();
  const {setMessages} = useMessages()
  
  useEffect(() => {
    contextMenuCloser();

    (async () => {
      await connect()

      const user: string | null = localStorage.getItem('anikihref-blog-app-x1')

      if (user) {
        const [username, password] = user?.split('+');
        const data = await findUser(username, password);

        if (data) {
          // отримуєм всі пости користувача і записуємо їх
          data.posts = await getUserPosts(data._id)
          
          logIn(setLoginedUser, setMessages, data, navigate)
        } else {
          navigate('/identification')
        }
      } else {
        navigate('/identification')
      }
    })()
    

    return function() {
      removeContextMenuCloser()
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route
          path="/identification/"
          element={
            <div className="login-page">
              <Outlet />
            </div>
          }
        >
          <Route index element={<Identification />} />

          <Route path="login" element={<LoginForm />} />

          <Route path="register" element={<RegistrationForm />} />
        </Route>
      </Routes>

      <MessagesStack/>

    </>
  );
}

export default App;
