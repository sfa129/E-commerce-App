import { useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const CartSync = () => {
  const { items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const syncToFirestore = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        await setDoc(cartRef, { items });
      }
    };

    syncToFirestore();
  }, [items, user]);

  return null; // This component only syncs data
};

export default CartSync;
