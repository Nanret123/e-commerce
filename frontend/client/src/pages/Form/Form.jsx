/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import "./Form.css";
import { setLogin } from "../../state";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const registerSchema = yup.object().shape({
  
  name: yup
    .string()
    .required("required")
    .max(15, "must be 15 characters or less"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "password must be at least 6 characters"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "password must be at least 6 characters"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const FormPage = () => {
  const [pageType, setPageType] = useState("register");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  

  const register = async (values, onSubmitProps) => {

    const SignUpResponse = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await SignUpResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) setPageType("login");
  };

  const login = async (values, onSubmitProps) => {
    const loginResponse = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedinUser = await loginResponse.json();
    console.log(loggedinUser);
    onSubmitProps.resetForm();
    if (loggedinUser) {
      dispatch(
        setLogin({
          user: loggedinUser.user,
          token: loggedinUser.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async(values, onSubmitProps) => {
    console.log(values);
    if(isLogin) await login(values, onSubmitProps);
    if(isRegister) await register(values, onSubmitProps);
  };


  return (
    <section className="form-section">
      <h2>T-R STORES</h2>
      <div className="form-div">
        <h5>Welcome Onboard!</h5>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => ( 
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-wrapper">
                {isRegister && (
                  <>
                    
                    <input
                      type="text"
                      label="Name"
                      placeholder="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      className={`${errors.name && touched.name ? "input-error" : ""
                        }`}
                    />
                    {errors.name && touched.name ? (
                      <div className="errors">{errors.name}</div>
                    ) : null}

                    <input
                      type="email"
                      label="Your E-mail"
                      placeholder="Your E-mail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      className={`${errors.email && touched.email ? "input-error" : ""
                        }`}
                    />

                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}

                    <input
                      type="password"
                      label="Password"
                      placeholder="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      className={`${errors.password && touched.password ? "input-error" : ""
                        }`}
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </>
                )}

                {isLogin && (
                  <>
                    <input
                      type="email"
                      label="Your E-mail"
                      placeholder="Your E-mail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      className={`${errors.email && touched.email ? "input-error" : ""
                        }`}
                    />

                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}

                    <input
                      type="password"
                      label="Password"
                      placeholder="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      className={`${errors.password && touched.password ? "input-error" : ""
                        }`}
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </>
                )}
              </div>

              <div>
                <button type="submit" className="form-btn">
                  {isLogin ? "LOGIN" : "REGISTER"}
                </button>
                <p className="form-reset">
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here"}
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FormPage;
