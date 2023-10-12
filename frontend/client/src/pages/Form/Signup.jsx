import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import "./Form.css";
import { setError } from "../../state";

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

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const error = useSelector((state) => state.auth.error);

  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const SignUpResponse = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (SignUpResponse.status == 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (SignUpResponse.status !== 200 || savedUser.status !== 201) {
        throw new Error("'Creating a user failed!'");
      }
      const savedUser = await SignUpResponse.json();

      onSubmitProps.resetForm();

      if (savedUser) navigate("/login");
    } catch (error) {
      setError({ error: error });
      navigate("/error");
    }
  };

  return (
    <section className="form-section">
      <div className="form-div">
        <h5>Welcome Onboard!</h5>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
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
                <>
                  <input
                    type="text"
                    label="Name"
                    placeholder="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    className={`${
                      errors.name && touched.name ? "input-error" : ""
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
                </>
              </div>
              <div>
                <button type="submit" className="form-btn">
                  REGISTER{" "}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Signup;
