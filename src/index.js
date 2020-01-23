import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import "./styles.css";
import "./styles-custom.css";
import * as Yup from "yup";
import styled from "@emotion/styled";
import cx from "classnames";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={cx({ hasError: meta.touched && meta.error })}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const StyledSelect = styled.select``;

const StyledErrorMessage = styled.div``;

const StyledLabel = styled.label``;

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const SignupForm = ({ firstName, lastName, email, acceptedTerms, jobType }) => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          acceptedTerms: acceptedTerms || false,
          jobType: jobType || ""
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required!"),
          lastName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required!"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required!"),
          acceptedTerms: Yup.boolean()
            .required("Required!")
            .oneOf([true], "You must accept the T&C"),
          jobType: Yup.string()
            .oneOf(
              ["developer", "designer", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required!")
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {formik => (
          <Form>
            <MyTextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="John"
            />
            <MyTextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Doe"
            />
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="johndoe@example.com"
            />
            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="product">Product</option>
              <option value="other">Other</option>
            </MySelect>

            <MyCheckbox name="acceptedTerms">
              I accept the Terms and Conditions
            </MyCheckbox>

            <br />
            <button type="submit" disabled={formik.isSubmitting}>
              Submit
            </button>
            <button type="reset">Reset</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

function App() {
  return <SignupForm firstName="JFK" />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
