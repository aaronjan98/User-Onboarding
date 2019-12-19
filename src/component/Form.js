import React, {
    useState,
    useEffect
  } from "react";
import {
    withFormik,
    Form,
    Field
  } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Onboard = ({ values, errors, touched, status }) => {

    const [user, setUser] = useState([]);
    useEffect(() => {
      console.log("status has changed", status);
      status && setUser(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form" >
            <Form>
                <label htmlFor="name">Name:</label>
                <Field id="name" type="text" name="name" />
                {touched.name && errors.name && (
                    <p className="errors">{errors.name}</p>
                )}

                <label htmlFor="email">Email:</label>
                <Field id="email" type="text" name="email" />
                {touched.email && errors.email && (
                    <p className="errors">{errors.email}</p>
                )}

                <label htmlFor="password">Password:</label>
                <Field id="password" type="text" name="password" />
                {touched.password && errors.password && (
                    <p className="errors">{errors.password}</p>
                )}

                <label htmlFor="terms" className="checkbox-container">
                Terms of Service
                <Field
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
                />
                {touched.terms && errors.terms && (
                    <p className="errors">{errors.terms}</p>
                )}
                <span className="checkmark" />
                </label>

                <button type="submit">Submit!</button>

            </Form>

            {user.map(userInfo => (
                <ul key={userInfo.id}>
                <h1>{userInfo.name}</h1>
                <p>Email: {userInfo.email}</p>
                <p>Password: {userInfo.password}</p>
                </ul>
            ))}

        </div>
    );
};

const FormikForm = withFormik({
    mapPropsToValues({ name, email, terms, password }) {
      return {
        name: "",
        email: "",
        password: password,
        terms: terms || false,
        notes: ""
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Is Required"),
      email: Yup.string().required("Is Required"),
      password: Yup.string().required("Is Required"),
      terms: Yup.boolean().oneOf([true], "Must approved terms of service")
    }),
    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          console.log("success", res);
          setStatus(res.data);
          resetForm();
        })
        .catch(err => console.log(err.response));
    }
  })(Onboard);

  export default FormikForm;