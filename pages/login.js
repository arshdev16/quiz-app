import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const login = ({ setLoading }) => {
  useEffect(() => {
    setLoading(false);
  }, []);

  const formSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  return (
    <div className="flex flex-col items-center justify-start my-10 p-5 w-screen h-screen">
      <h1 className="text-3xl">Login</h1>
      <Formik
        validationSchema={formSchema}
        validateOnMount={true}
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values) => {
          console.table(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-start items-center w-1/2 h-40">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" placeholder="Username" className=" text-black w-full
              m-3 h-10 p-4 rounded-xl focus: border-3 border-white"/>
              <ErrorMessage name="username" component="div" className='text-red-500'/>
            </div>
            <div className="flex flex-col justify-start items-center h-40 w-1/2">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="Email" className=" text-black w-full
              m-3 h-10 p-4 rounded-xl focus: border-3 border-white"/>
              <ErrorMessage name="email" component="div" className='text-red-500'/>
            </div>
            <div className="flex flex-col justify-start items-center w-1/2 h-40">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder="Password" className=" text-black w-full
              m-3 h-10 p-4 rounded-xl focus: border-3 border-white"/>
              <ErrorMessage name="password" component="div" className='text-red-500'/>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default login;
