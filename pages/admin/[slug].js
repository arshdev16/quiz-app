import React, { useContext, useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { firebaseApp } from "../../lib/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { AppContext } from "../../lib/Context";
import toast from "react-hot-toast";

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
  const firestore = getFirestore(firebaseApp);
  const { setLoading } = useContext(AppContext);
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
        validateOnMount={true}
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
              <div
                key={index}
                className="flex justify-center w-4/5 border-2 border-white m-5 rounded-3xl bg-slate-700"
              >
                <Formik
                  initialValues={{
                    question: " ",
                    option1: " ",
                    option2: " ",
                    option3: " ",
                    option4: " ",
                    correctAnswer: " ",
                  }}
                  validationSchema={Yup.object().shape({
                    question: Yup.string().required("Question is required"),
                    option1: Yup.string().required("Option 1 is required"),
                    option2: Yup.string().required("Option 2 is required"),
                    option3: Yup.string().required("Option 3 is required"),
                    option4: Yup.string().required("Option 4 is required"),
                  })}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    try {
                      console.log(values);
                      // setLoading(true);
                      // const newQuestion = {
                      //   question: values.question,
                      //   option1: values.option1,
                      //   option2: values.option2,
                      //   option3: values.option3,
                      //   option4: values.option4,
                      //   correctAnswer: values.correctAnswer,
                      // };

                      // await setDoc(doc(firestore, `users/${userId}/yourquizes/${slug}`), newQuestion);
                      // setLoading(false);
                      // toast.success("Question updated successfully");
                    } catch (e) {
                      console.error(e.message);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <div className="w-full flex flex-col justify-center items-center">
                      <InputField
                        name={`question`}
                        label={`Question ${index + 1}`}
                        placeholder={`question ${index + 1}`}
                        type="text"
                        defaultValue={question.question}
                      />
                      <div className="flex flex-col items-center">
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
                        <SelectField
                          name="correctAnswer"
                          label={`correct answer for question ${index}`}
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl m-5"
                          disabled={isSubmitting}
                        >
                          Update question
                        </button>
                      </div>
                    </div>
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

const SelectField = (props) => {
  return (
    <div className="flex flex-col justify-start items-center w-1/2 h-28 mx-5 my-5">
      <label htmlFor={props.name}>{props.label}</label>
      <Field as="select" name={props.name} className="text-black m-5">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </Field>
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
