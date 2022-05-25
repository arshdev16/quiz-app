import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import { firebaseApp } from "../lib/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { AppContext } from "../lib/Context";

const QuizFeed = ({ quizes }) => {
  return quizes
    ? quizes.map((quiz) => <QuizItem quiz={quiz} key={quiz.slug} />)
    : null;
};

const QuizItem = ({ quiz }) => {
  const router = useRouter();
  const { setLoading, userId } = useContext(AppContext);

  const deleteQuiz = async () => {
    setLoading(true);
    const firestore = getFirestore(firebaseApp);
    const { slug } = quiz;
    const docRef = doc(firestore, `users`, userId, `yourquizes`, slug);
    await deleteDoc(docRef);
    setLoading(false);
    router.push("/admin/yourquizes");
  };

  return (
    <div className="flex items-start justify-between w-max m-4 bg-zinc-800 p-4 border-2 border-white rounded-xl shadow-white shadow">
      <div className="mx-3">
        <h1 className="text-2xl font-bold m-0">{quiz.title}</h1>
        <p className="text-md font-thin">{quiz.about}</p>
        <p className="text-md font-bold">slug:- {quiz.slug}</p>
      </div>
      <div>
        <button
          className="m-1"
          onClick={() => {
            router.push(`/admin/${quiz.slug}`);
          }}
        >
          <FaEdit height={100} weight={100} />
        </button>
        <button
          className="m-1"
          onClick={() => {
            deleteQuiz();
          }}
        >
          <AiFillDelete height={100} weight={100} />
        </button>
      </div>
    </div>
  );
};

export default QuizFeed;
