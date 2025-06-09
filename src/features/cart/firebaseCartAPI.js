// src/features/cart/firebaseCartAPI.js
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Save cart items to Firestore under 'carts/{uid}'
 */
export const saveCartToFirestore = async (uid, cartItems) => {
  try {
    await setDoc(doc(db, 'carts', uid), { items: cartItems });
  } catch (error) {
    console.error('Error saving cart to Firestore:', error);
    throw error;
  }
};

/**
 * Load cart items from Firestore under 'carts/{uid}'
 */
export const loadCartFromFirestore = async (uid) => {
  try {
    const docRef = doc(db, 'carts', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error loading cart from Firestore:', error);
    throw error;
  }
};
