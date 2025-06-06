import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Components/Home/Home.jsx';
import AddToCart from './Components/AddToCart/AddToCart.jsx';
import ProductDetail from './Components/ProductDetail/ProductDetail.jsx';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import './index.css'; // This line is essential
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import ProtectedRoute from '../src/Components/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='AddToCart' element={<AddToCart />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<ProtectedRoute><AddToCart /></ProtectedRoute>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

