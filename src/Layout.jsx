import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase.js";
import { setUser } from "./features/auth/authSlice.js";
import { setCartItems } from "./features/cart/cartSlice";
import { doc, getDoc } from "firebase/firestore";
import CartSync from './Components/AddToCart/CartSync.jsx';

function Layout() {

    const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user));
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          dispatch(setCartItems(cartSnap.data().items || []));
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

    return (
        <>
            <Header />
            <CartSync />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout