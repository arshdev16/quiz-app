import React, { useContext, useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { firebaseApp } from "../../lib/firebase";
import { getFirestore, doc, collection } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { AppContext } from "../../lib/Context";

const QuizEdit = () => {
  const { userId } = useContext(AppContext);
  const firestore = getFirestore(firebaseApp);
  const router = useRouter();
  const { slug } = router.query;
  const QuizRef = doc(firestore, `users/${userId}/yourquizes/${slug}`);
  const [quiz] = useDocumentDataOnce(QuizRef);
  console.log(quiz);
  return (
    <AuthCheck>
      {quiz && (
        <main className="flex flex-col justify-center items-center w-screen px-20 py-10">
          <h1 className="text-bold text-2xl my-2">{quiz.title}</h1>
          <div className="flex justify-center border-2 bg-zinc-800 items-center p-10 w-screen border-white rounded-3xl">
            <div className="flex w-full h-full justify-center">
              <QuizEditor quiz={quiz} />
            </div>
          </div>
        </main>
      )}
    </AuthCheck>
  );
};

const QuizEditor = ({ quiz }) => {
  const initialValues = {
    description: quiz.description,
    questions: quiz.questions,
  };

  return (
    <div className="my-5 w-full flex items-center flex-col justify-center items-centers">
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          description: Yup.string().required("Description is required"),
          questions: Yup.array().required("Questions are required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex justify-start w-full items-center flex-col flex-grow m-3">
            <InputField
              name="description"
              label="Description"
              placeholder="description"
              type="text"
              defaultValue={quiz.description}
            />
            {quiz.questions.map((question, index) => (
              <div key={index} className="flex justify-center w-4/5 border-2 border-white m-5 rounded-3xl bg-slate-700">
                <Formik
                  initialValues={{
                    question: question.question,
                    option1: question.option1,
                    option2: question.option2,
                    option3: question.option3,
                    option4: question.option4,
                    correctAnswer: question.correctAnswer,
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="w-full flex flex-col justify-start items-center">
                      <InputField
                        name={`question`}
                        label={`Question ${index + 1}`}
                        placeholder={`question ${index + 1}`}
                        type="text"
                        defaultValue={question.question}
                      />
                      <div className="flex flex-col">
                        <div className="flex">
                          <InputField
                            name={"option1"}
                            label={"option 1"}
                            placeholder={"option 1"}
                            type="text"
                            defaultValue={question.option1}
                          />
                          <InputField
                            name={"option2"}
                            label={"option 2"}
                            placeholder={"option 2"}
                            type="text"
                            defaultValue={question.option2}
                          />
                        </div>
                        <div className="flex">
                          <InputField
                            name={"option3"}
                            label={"option 3"}
                            placeholder={"option 3"}
                            type="text"
                            defaultValue={question.option3}
                          />
                          <InputField
                            name={"option4"}
                            label={"option 4"}
                            placeholder={"option 4"}
                            type="text"
                            defaultValue={question.option4}
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const InputField = (props) => {
  return (
    <div className="flex flex-col justify-start items-center w-1/2 h-28 mx-5 my-2">
      <label htmlFor={props.name}>{props.label}</label>
      <Field
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        className=" text-black w-full
      m-3 h-10 p-4 rounded-xl focus: border-3 border-white outline-none focus:border-sky-400"
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
};

export default QuizEdit;
