import React from 'react'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MainLayout from './Layouts/MainLayout';
import Weather from './pages/Weather';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index : true,
        element: <Home/>
      },
      {
        path : "/weather",
        element: <Weather/>

      }
    ]
  },

]);

const Router = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Router
