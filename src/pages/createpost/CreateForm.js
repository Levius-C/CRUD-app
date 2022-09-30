import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const nav = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Title required!"),
    description: yup.string().required("There must be something to say!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    nav("/");
  };
  return (
    <div className="formback">
      <form onSubmit={handleSubmit(onCreatePost)} className="formbody">
        <p>{errors.title?.message}</p>
        <input placeholder="Title here" {...register("title")} />
        <p>{errors.description?.message}</p>
        <textarea
          placeholder="What you want to say"
          {...register("description")}
        />
        <div className="button">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
