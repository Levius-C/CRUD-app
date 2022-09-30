import React, { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import {
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Posts = (props) => {
  const { post } = props;

  const [user] = useAuthState(auth);

  const [liked, setLiked] = useState([]);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLiked(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const hasUserLiked = liked.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const addLikes = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLiked((prev) => [...prev, { userId: user?.uid, likeId: newDoc.id }]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLikes = async () => {
    try {
      const userLikedDoc = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeDeleteData = await getDocs(userLikedDoc);
      const likeId = likeDeleteData.docs[0].id;
      const likeDelete = doc(db, "likes", likeId);
      await deleteDoc(likeDelete);
      if (user) {
        setLiked((prev) => prev.filter((like) => like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    user && (
      <div className="postcontainer">
        <div className="post">
          <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="author">
            <p>@{post.username}</p>
          </div>
          <div className="body">
            <p>{post.description}</p>
          </div>
        </div>
        <div className="hearts">
          <button
            onClick={hasUserLiked ? removeLikes : addLikes}
            className={hasUserLiked ? "buttonclicked" : null}
          >
            &#x2764;
          </button>
          {liked.length > 0 ? <p>{liked.length}</p> : ""}
        </div>
      </div>
    )
  );
};

export default Posts;
