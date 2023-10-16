/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import "./Form.css";
import { setLogin, setError } from "../../state";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .required("required")
    .min(6, "password must be at least 6 characters"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const loginResponse = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
     
      const loggedinUser = await loginResponse.json();
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
    } catch (error) {
      setError({ error: error });
    }
  };

  return (
    <section className="form-section">
      <div className="form-div">
        <h5>Welcome Onboard!</h5>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
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
                <input
                  type="email"
                  label="Your E-mail"
                  placeholder="Your E-mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  className={`${
                    errors.email && touched.email ? "input-error" : ""
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
                  className={`${
                    errors.password && touched.password ? "input-error" : ""
                  }`}
                />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <div>
                <button type="submit" className="form-btn">
                  LOGIN
                </button>
                <p className="form-reset">
                  Don&apos;t have an account?{" "}
                  <Link to="/signup">Sign Here</Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
