// src/Components/Auth/Signup.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(userCredential.user));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 font-semibold">Signup</h2>
        <input type="email" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="input mt-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn mt-4 w-full">Signup</button>
      </form>
    </div>
  );
}
