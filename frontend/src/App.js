import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from './components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authActions';
import Messages from './pages/Messages';
import PrivateRoute from './utils/PrivateRouter';
import Explore from './pages/Explore';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Header from './components/Header';
import { getPost } from './redux/actions/postActions';
import io from "socket.io-client"
import { ALERT_TYPES } from "./redux/actions/alertActions";
import { getNotify } from './redux/actions/notifyActions';
import SocketioClient from './SocketioClient';
import Conversation from './components/Conversation';


function App() {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io();
    dispatch({ type: ALERT_TYPES.SOCKET, payload: socket })
    return () => socket.close();
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      dispatch(getPost(auth.token))
      dispatch(getNotify(auth))
    }
  }, [auth.token, auth, dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Alert />
        {auth.token && <Header />}
        {auth.token && <SocketioClient />}
        <Routes>
          <Route path="/" element=
            {auth.token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path='/message' element={<PrivateRoute />}>
            <Route exact path='/message' element={<Messages />} />
          </Route>
          <Route exact path='/explore' element={<PrivateRoute />}>
            <Route exact path='/explore' element={<Explore />} />
          </Route>
          <Route exact path='/notification' element={<PrivateRoute />}>
            <Route exact path='/notification' element={<Notifications />} />
          </Route>
          <Route exact path='/profile/:id' element={<PrivateRoute />}>
            <Route exact path='/profile/:id' element={<Profile />} />
          </Route>
          <Route path="/post/:id" element={<Post />} />
          <Route path="/message/:id" element={<Conversation />} />
          <Route path="/post" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
