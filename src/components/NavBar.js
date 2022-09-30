import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const [user] = useAuthState(auth);

  const nav = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    nav("/");
  };

  return (
    <div className="navbar">
      <Link to="/">HOME</Link>
      {user ? (
        <div className="features">
          <Link to="/createpost">CREAT POST</Link>
          <div className="userinfo">
            <img src={user?.photoURL || ""} />
            <p>@{user?.displayName}</p>
          </div>
          <button onClick={logout}>LOG OUT</button>
        </div>
      ) : (
        <button onClick={login}>LOG IN</button>
      )}
    </div>
  );
};

export default NavBar;
