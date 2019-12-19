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
                <Field id="email" type="text" email="email" />
                {touched.email && errors.email && (
                    <p classemail="errors">{errors.email}</p>
                )}

                <label htmlFor="password">Password:</label>
                <Field id="password" type="text" password="password" />
                {touched.password && errors.password && (
                    <p classpassword="errors">{errors.password}</p>
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
                <li>Name: {userInfo.name}</li>
                <li>Email: {userInfo.email}</li>
                <li>Password: {userInfo.password}</li>
                </ul>
            ))}

        </div>
    );
};

export default Onboard;