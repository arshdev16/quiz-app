import React from "react";

const QuizFeed = ({ quizes }) => {
  return quizes
    ? quizes.map((quiz) => <QuizItem quiz={quiz} key={quiz.slug} />)
    : null;
};

const QuizItem = ({ quiz }) => {
  return (
    <div className="flex flex-col items-start justify-start w-1/5 m-4 bg-zinc-800 p-6 border-2 border-white rounded-xl shadow-white shadow">
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <p>{quiz.slug}</p>
    </div>
  );
};

export default QuizFeed;
