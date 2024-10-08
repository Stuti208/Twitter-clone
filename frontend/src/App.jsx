import { useState } from 'react'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Login/Signup.jsx';
import LoginHomePage from './pages/Login/LoginHomePage.jsx';
import Home from './pages/Home.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import PageLoading from './pages/PageLoading.jsx';
import Video from './pages/Video.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Feed from './pages/Feed/Feed.jsx';
import Explore from './pages/Explore/Explore.jsx';
import Notifications from './pages/Notifications/Notifications.jsx';
import Messages from './pages/Messages/Messages.jsx';
import Bookmarks from './pages/Bookmarks/Bookmarks.jsx';
import Communities from './pages/Communities/Communities.jsx';
import Profile from './pages/Profile/Profile.jsx';
import More from './pages/More/More.jsx';
import ForgetPassword from './pages/Login/ForgetPassword.jsx';
import SetPassword from './pages/Login/SetPassword.jsx';


function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginHomePage/>
    },

    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/signup",
      element: <Signup/>
    },

    {
      path: "/password-reset",
      element: <ForgetPassword/>
    },

    {
      path: "/password-set",
      element: <SetPassword/>
    },

    {
      path: "/video",
      element: <Video/>
    },


    {
      path: "/home",
      element: <ProtectedRoute><Home /></ProtectedRoute>,
      
      children: [
        { index:true, element: <Feed /> },
        { path: 'feed', element: <Feed /> },
        { path: 'explore', element: <Explore /> },
        { path: 'notifications', element: <Notifications /> },
        { path: 'messages', element: <Messages /> },       
        { path: 'bookmark', element: <Bookmarks /> },    
        { path: 'communities', element: <Communities /> },   
        { path: 'profile', element: <Profile /> },       
        { path: 'more', element:<More/> },
      ],
    },

    {
      path: "/page-loading",
      element: <PageLoading/>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
