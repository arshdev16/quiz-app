import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { firestore, auth } from "../lib/firebase";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const signup = ({ setLoading, loading }) => {
  useEffect(() => {
    setLoading(false);
  }, []);

  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <>
      {loading ? (
        <div className="flex flex-col w-screen h-screen items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start m-10 p-5 w-screen h-screen">
          <h1 className="text-3xl">Signup</h1>
          <Formik
            validationSchema={formSchema}
            validateOnMount={true}
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                await auth.createUserWithEmailAndPassword(
                  values.email,
                  values.password
                );
                await firestore
                  .collection("users")
                  .doc(auth.currentUser.uid)
                  .set({
                    username: values.username,
                    email: values.email,
                  });
                setLoading(false);
                toast.success("Successfully signed up!");
              } catch (e) {
                console.error(e);
                toast.error("Some error occured");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="m-5 flex flex-col justify-center items-center w-full">
                <InputField
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Enter Your Name..."
                />
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter Your Email..."
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  password="Enter Your Password..."
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-1/2"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};
const InputField = (props) => {
  return (
    <div className="flex flex-col justify-start items-center w-1/2 h-28 m-2">
      <label htmlFor={props.name}>{props.label}</label>
      <Field
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
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
export default signup;
