import { useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames/bind";

import {
  emailSignup,
  emailLogin,
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "~/firebaseServices";
import { authSet } from "~/features/authSlice";
import Button from "~/components/Button";
import styles from "./Login.module.css";

const cx = classNames.bind(styles);

function Login({ onAuth }) {
  const [method, setMethod] = useState("Log in");
  const [authErr, setAuthErr] = useState(null);
  const dispatch = useDispatch();
  return (
    <div className={cx("form-content")}>
      <h2 className={cx("greeting")}>Hi,</h2>
      <p className={cx("label")}>
        <span className={cx("login")} onClick={() => setMethod("Log in")}>
          Log in
        </span>{" "}
        or{" "}
        <span className={cx("signup")} onClick={() => setMethod("Sign up")}>
          create an account
        </span>
      </p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required("Please fill in email"),
          password: Yup.string()
            .min(8, "Password must be 8 characters or greater")
            .required("Please fill in password"),
        })}
        onSubmit={(values) => {
          const auth = getAuth();
          setPersistence(auth, browserLocalPersistence);
          if (method === "Sign up") {
            emailSignup(auth, values.email, values.password)
              .then((user) => {
                console.log("user:", user);
                const userName = user.displayName || user.email.split("@")[0];
                dispatch(
                  authSet({
                    auth: user.accessToken,
                    userId: user.uid,
                    userName,
                  })
                );
                onAuth();
              })
              .catch((error) => {
                setAuthErr(error);
              });
          } else if (method === "Log in") {
            emailLogin(auth, values.email, values.password)
              .then((user) => {
                console.log("user:", user);
                const userName = user.displayName || user.email.split("@")[0];
                dispatch(
                  authSet({
                    auth: user.accessToken,
                    userId: user.uid,
                    userName,
                  })
                );
                onAuth();
              })
              .catch((error) => {
                setAuthErr(error);
              });
          }
        }}
      >
        {(formik) => (
          <Form className={cx("form")} onChangeCapture={() => setAuthErr(null)}>
            <Field
              className={cx("email-input")}
              type="email"
              name="email"
              value={formik.email}
              placeholder={"Email Address"}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={cx("error")}>{formik.errors.email}</p>
            )}
            <Field
              className={cx("pass-input")}
              type="password"
              name="password"
              value={formik.password}
              placeholder={"Password"}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={cx("error")}>{formik.errors.password}</p>
            )}
            <div className={cx("submit")}>
              {authErr && <p className={cx("auth-error")}>{authErr}</p>}
              <Button label={method} type={"submit"} />
            </div>
          </Form>
        )}
      </Formik>
      <div className={cx("other-method")}>
        <div className={cx("other-label")}>
          <span className={cx("line")}></span>
          <p>Or continue with</p>
          <span className={cx("line")}></span>
        </div>

        <ul className={cx("method")}>
          <li className={cx("method-icon")}>
            <FontAwesomeIcon icon={faFacebook} />
          </li>
          <li className={cx("method-icon")}>
            <FontAwesomeIcon icon={faGoogle} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
