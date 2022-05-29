import React, { useState, useContext, useEffect } from "react";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import {
  getFirestore,
  collection,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { firebaseApp } from "../../lib/firebase";
import { AppContext } from "../../lib/Context";
import { useCollectionData } from "react-firebase-hooks/firestore";
import QuizFeed from "../../components/QuizFeed";
import AuthCheck from "../../components/AuthCheck";

const yourQuizes = () => {
  return (
    <div className="flex flex-col items-start justify-start m-10 p-5 w-screen h-screen">
      <AuthCheck>
        <QuizList />
        <CreateBtn />
      </AuthCheck>
    </div>
  );
};

const QuizList = () => {
  const { user } = useContext(AppContext);
  const [quizes] = useCollectionData(
    collection(getFirestore(firebaseApp), `users/${user.uid}/yourquizes`),
    {
      idField: "slug",
    }
  );
  return (
    <>
      <h1 className="text-2xl font-bold">Your Quizes</h1>
      <div className="flex flex-wrap w-full h-max justify-self-center">
        {quizes && quizes.length > 0 ? (
          <QuizFeed quizes={quizes} />
        ) : (
          <h1 className="text-2xl font-bold m-4">No Quizes Yet</h1>
        )}
      </div>
    </>
  );
};

const CreateBtn = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && slug.length > 60;
  const { username, setLoading, userId } = useContext(AppContext);
  const firestore = getFirestore(firebaseApp);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        slug,
        createdAt: serverTimestamp(),
        createdBy: username,
        published: false,
        about: "Write something about your quiz",
        questions: [
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
          {
            question: "2+2=?",
            option1: "1",
            option2: "2",
            option3: "3",
            option4: "4",
            correctAnswer: "4",
          },
        ],
      };

      setLoading(true);
      const docRef = doc(firestore, "users", userId, "yourquizes", slug);

      await setDoc(docRef, data)
        .then(() => {
          setLoading(false);
          toast.success("Successfully created quiz!");
          router.push(`/admin/${slug}`);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Something went wrong!");
        });
    } catch (e) {
      console.error(e.message);
      toast.error("Some message occured");
    }
  };

  return (
    <div className="flex w-full my-4">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Quiz title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="New title"
          className="text-black w-full
      m-3 h-10 p-4 rounded-xl focus: border-3 border-white outline-none focus:border-sky-400"
          id="title"
        />
        <p className="m-4">
          <strong>Slug:</strong>
          {" " + slug}
        </p>
        <button
          aria-label="Create new post"
          type="submit"
          className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-sky-600 to-indigo-500 hover:from-sky-700 hover:to-indigo-500 active:from-indigo-800 active:to-sky-700 focus-visible:ring ring-indigo-500 text-white font-semibold text-center rounded-md outline-none transition duration-200 px-5 py-2 mx-3"
          disabled={isValid}
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default yourQuizes;
